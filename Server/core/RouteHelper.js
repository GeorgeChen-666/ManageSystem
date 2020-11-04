const { body, param, validationResult } = require('express-validator');

function param2filters(params) {
  const arrayFunction = (values) => (obj) => {
    return obj.filter((row) => {
      return values.includes(row.username);
    });
  };
  return params
    .map((param) => {
      const { propertyName, value } = param;
      const values = [].concat(value);
      if (values.length > 1) {
        return arrayFunction(value);
      } else if (values.length === 1) {
        return values[0];
      }
    })
    .filter((e) => e);
}
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
        data: entityData.getFitData(),
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
// const filterParams = [
//   {
//     propertyName: 'username',
//     value: ['admin'],
//   },
//   {
//     propertyName: 'id',
//     value: ['1', '1602306639695', '1602431998492'],
//   },
// ];
function canPageSearch(
  router,
  entityType,
  { pathName = '/page', extraRules = [] }
) {
  router.get(
    pathName,
    [...extraRules],
    PublicHandler(function (req, res) {
      const { filter: paramFilter, searchAfter, pageSize, sort } = req.params;
      const filter = param2filters(paramFilter);
      const items = entityType
        .pageRecords(
          {
            searchAfter,
            pageSize,
            filter,
            sort,
          },
          req.currentUser
        )
        .map(entityType.fitData);
      const total = entityType.findRecords(filter, req.currentUser).length;
      res.json({
        items,
        total,
      });
    })
  );
}

module.exports = {
  PublicHandler,
  canModify,
  canRemove,
  canRestore,
  canPageSearch,
};
