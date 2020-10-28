const express = require('express');
const _ = require('lodash');
const { body, param } = require('express-validator');
const router = express.Router();
const Users = require('../models/Users');
const { PublicHandler, canRemove, canRestore } = require('../core/RouteHelper');
const { generateToken } = require('../core/jwt');

const publicRules = [
  body('username').exists().withMessage('请传入用户名'),
  body('password').exists().withMessage('请传入密码')
];

router.get('/', function(req, res, next) {
  res.json({
    message: 'respond with a resource'
  });
});
canRemove(router, Users, {
  extraRules: [
    param().custom(({ id }, { req }) => {
      const opUser = new Users(id);
      const { currentUser } = req;
      if (opUser.username === currentUser.username) {
        throw new Error('不能删除当前登录用户');
      }
      return true;
    })
  ]
});
canRestore(router, Users, {});
router.post(
  '/register',
  [
    ...publicRules,
    body('username').custom((username) => {
      if (!username) return true;
      const user = Users.getUserByName(username);
      if (user) {
        throw new Error('用户已经重复');
      }
      return true;
    })
  ],
  PublicHandler(function(req, res, next) {
    const userData = _.pick(req.body, ['username', 'password']);
    const userEntity = new Users(userData, req.currentUser);
    userEntity.saveRecord();
    res.json({
      message: 'register'
    });
  })
);

router.post(
  '/login',
  [
    ...publicRules,
    body().custom(({ username, password }, { req, res }) => {
      if (!username || !password) return true;
      const userData = Users.getUserByName(username);
      if (userData) {
        const userEntity = new Users(userData, req.currentUser);
        if (userEntity.lock) {
          throw new Error('用户被锁定');
        }
        if (Users.md5(password) !== userEntity.password) {
          userEntity.errorTimes = (userEntity.errorTimes || 0) + 1;
          if (userEntity.errorTimes >= 5) {
            // userEntity.lock = true;
          }
          userEntity.saveRecord();
          throw new Error('密码不正确');
        }
        req.lastLoginTime = userEntity.lastLoginTime;
        userEntity.lastLoginTime = new Date().getTime();
        userEntity.errorTimes = 0;
        userEntity.saveRecord();
        return true;
      } else {
        throw new Error('用户不存在');
      }
    })
  ],
  PublicHandler((req, res, next) => {
    const { username } = req.body;
    const token = generateToken({
      username
    });
    res.json({
      jwt: token,
      lastLoginTime: req.lastLoginTime
    });
  })
);

module.exports = router;
