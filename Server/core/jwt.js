const appRoot = require('app-root-path');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const KEY = '!@#$%^&*';

function registerJwtFilter(app, unless = []) {
  app.use(
    expressJWT({
      secret: KEY,
      algorithms: ['HS256']
    }).unless({
      path: [...unless] //除了这个地址，其他的URL都需要验证
    }),
    function(req, res, next) {
      const token = (req.headers.authorization || '').replace('Bearer ', '');
      if (token) {
        const { user } = getDataFromToken(token);
        req.currentUser = Users.getEntityByData(user, '@');
      }
      next();
    }
  );
}

function getDataFromToken(token) {
  return jwt.verify(token, KEY);
}

function generateToken(object) {
  return jwt.sign(object, KEY, { expiresIn: '1h' });
}

module.exports = {
  registerJwtFilter,
  generateToken,
  getDataFromToken
};
