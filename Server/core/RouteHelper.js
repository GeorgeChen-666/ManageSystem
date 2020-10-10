const { body, validationResult } = require('express-validator');

function PublicHandler(callback) {
  return function(req, res, next) {
    const vr = validationResult(req);
    if (!vr.isEmpty()) {
      throw new Error(JSON.stringify(vr.array()));
    }
    callback(req, res, next);
  };
}

function regestRemove(router, entityType, {
  pathName = '/delete',
  extraRules = []
} = {}) {
  router.delete(pathName, [
    body('id').exists().withMessage('请传入id'),
    ...extraRules
  ], PublicHandler(function(req, res, next) {
    const { id } = req.body;
    const entityData = new entityType(id);
    entityData.removeRecord();
  }));
}

function regestRestore(router, entityType, {
  pathName = '/restore',
  extraRules = []
} = {}) {
  router.delete(pathName, [
    body('id').exists().withMessage('请传入id'),
    ...extraRules
  ], PublicHandler(function(req, res, next) {
    const { id } = req.body;
    const entityData = new entityType(id);
    entityData.restoreRecord();
  }));
}

module.exports = {
  PublicHandler
};