const express = require('express');
const appRoot = require('app-root-path');
const { body } = require('express-validator');
const router = express.Router();
const Users = appRoot.require('/models/Users');
const { PublicHandler, regestRemove, regestRestore } = appRoot.require('/core/RouteHelper');
const { generateToken } = appRoot.require('/core/jwt');

const publicRules = [
  body('username').exists().withMessage('请传入用户名'),
  body('password').exists().withMessage('请传入密码')
];

router.get('/', function(req, res, next) {
  res.json({
    message: 'respond with a resource'
  });
});
regestRemove(router, Users, {});
regestRestore(router, Users, {});
router.post('/register', [
  ...publicRules,
  body('username').custom(username => {
    if (!username) return true;
    const user = Users.getUserByName(username);
    if (user) {
      throw new Error('用户已经重复');
    }
    return true;
  })
], PublicHandler(function(req, res, next) {
  const userData = req.body;
  //TODO 应当移除注册时不应该有得字段
  const userEntity = new Users(userData, req.currentUser);
  userEntity.saveRecord();
  res.json({
    message: 'login'
  });
}));


router.post('/login', [
  ...publicRules,
  body().custom(({ username, password }, { req }) => {
    if (!username || !password) return true;
    const userData = Users.getUserByName(username);
    const userEntity = new Users(userData, req.currentUser);
    if (userData) {
      if (userEntity.lock) {
        throw new Error('用户被锁定');
      }
      if (Users.md5(password) !== userEntity.password) {
        userEntity.errorTimes = (userEntity.errorTimes || 0) + 1;
        if (userEntity.errorTimes >= 5) {
          userEntity.lock = true;
        }
        userEntity.saveRecord();
        throw new Error('密码不正确');
      }
    } else {
      throw new Error('用户不存在');
    }
    userEntity.lastLoginDate = new Date().getTime();
    userEntity.errorTimes = 0;
    userEntity.saveRecord();
    return true;
  })
], PublicHandler((req, res, next) => {
  const { username } = req.body;
  const token = generateToken({
    username
  });
  res.json({
    message: token
  });
}));


module.exports = router;
