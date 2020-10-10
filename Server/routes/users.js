const express = require('express');
const appRoot = require('app-root-path');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const Users = appRoot.require("/models/Users");

router.get('/', function (req, res, next) {
  res.json({
    message: 'respond with a resource'
  });
});
router.post('/register', [], function (req, res, next) {

});
router.post('/login', [
  body("username").exists().withMessage("请传入用户名"),
  body("password").exists().withMessage("请传入密码"),
  body().custom(({username, password}) => {
    if (!username || !password) return true;
    const user = Users.getUserByName(username);
    const userEntity = new Users(user);
    if (user) {
      if (userEntity.lock) {
        throw new Error("用户被锁定");
      }
      if (Users.md5(password) !== userEntity.password) {
        userEntity.errorTimes = (userEntity.errorTimes || 0) + 1;
        if (userEntity.errorTimes >= 5) {
          userEntity.lock = true
        }
        userEntity.saveRecord();
        throw new Error("密码不正确");
      }
    } else {
      throw new Error("用户不存在");
    }
    userEntity.lastLoginDate = new Date().getTime();
    userEntity.errorTimes = 0;
    userEntity.saveRecord();
    return true;
  })
], function (req, res, next) {
  const vr = validationResult(req);
  if (!vr.isEmpty()) {
    throw new Error(JSON.stringify(vr.array()));
  }
  res.json({
    message: "login"
  });
});
module.exports = router;
