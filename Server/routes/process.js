const express = require('express');
const _ = require('lodash');
const { body } = require('express-validator');
const router = express.Router();
const Process = require('../models/Process');

const {
  PublicHandler,
  param2filters,
  canModify,
  canRemove,
  canRestore,
  canPageSearch
} = require('../core/RouteHelper');
canModify(router, Process, {
  extraRules: [
    body('name').custom((name) => {
      const results = Process.findRecords({ name });
      if (results.length) {
        throw new Error('名称重复');
      }
      return true;
    })
  ]
});
canRemove(router, Process, {});
canRestore(router, Process, {});
canPageSearch(router, Process, {});
router.get(
  '/:id/pageLogs',
  [],
  PublicHandler(function(req, res, next) {
    const { id } = req.params;
    const {
      filter: paramFilter = '[]',
      searchAfter,
      pageSize,
      sort
    } = req.query;
    const filter = param2filters(JSON.parse(paramFilter));
    const items = Process.pageProcessLogs(id * 1,
      {
        searchAfter,
        pageSize,
        filter,
        sort
      },
      req.currentUser
    );
    const total = Process.findProcessLogs(id * 1, filter).length;
    res.json({
      items,
      total
    });
  })
);
module.exports = router;
