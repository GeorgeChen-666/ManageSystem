const express = require('express');
const path = require('path');
const { registerJwtFilter } = require('../core/jwt');
const createError = require('http-errors');
const indexRouter = require('./index');
const usersRouter = require('./users');
const processRouter = require('./process');

function setupRoutes(app) {
  app.use(express.static(path.join(__dirname, 'public')));

  registerJwtFilter(app, ['/api/users/login']);

  app.use('/api/', indexRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/process', processRouter);
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      next(createError(401));
    }
    next(err, req, res, next);
  });
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.json({
      message: err.message,
      stack: err.stack,
    });
  });
}

module.exports = setupRoutes;
