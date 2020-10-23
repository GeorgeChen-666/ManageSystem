const { body, param, validationResult } = require('express-validator');

function PublicHandler(callback) {
  return function (req, res, next) {
    const vr = validationResult(req);
    if (!vr.isEmpty()) {
      throw new Error(JSON.stringify(vr.array()));
    }
    callback(req, res, next);
  };
}

function canModify(
  router,
  entityType,
  { pathName = ['/modify', '/modify/:id'], extraRules = [] } = {}
) {
  router.put(
    pathName,
    [...extraRules],
    PublicHandler(function (req, res, next) {
      const { id } = req.params;
      const data = { ...req.body, id };
      const entityData = new entityType(data, req.currentUser);
      entityData.saveRecord();
      res.json({
        message: 'modify',
        data: entityData.getRawData(),
      });
    })
  );
}

function canRemove(
  router,
  entityType,
  { pathName = '/remove/:id', extraRules = [] } = {}
) {
  router.delete(
    pathName,
    [param('id').exists().withMessage('请传入id'), ...extraRules],
    PublicHandler(function (req, res, next) {
      const { id } = req.params;
      const entityData = new entityType(id, req.currentUser);
      entityData.removeRecord();
      res.json({
        message: 'remove',
      });
    })
  );
}

function canRestore(
  router,
  entityType,
  { pathName = '/restore/:id', extraRules = [] } = {}
) {
  router.patch(
    pathName,
    [param('id').exists().withMessage('请传入id'), ...extraRules],
    PublicHandler(function (req, res, next) {
      const { id } = req.params;
      const entityData = new entityType(id, req.currentUser);
      entityData.restoreRecord();
      res.json({
        message: 'restore',
      });
    })
  );
}

module.exports = {
  PublicHandler,
  canModify,
  canRemove,
  canRestore,
};
