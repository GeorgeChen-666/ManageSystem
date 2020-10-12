const express = require('express');
const _ = require('lodash');
const { body } = require('express-validator');
const router = express.Router();
const Process = require('../models/Process');
const {
  PublicHandler,
  canModify,
  canRemove,
  canRestore
} = require('../core/RouteHelper');
canModify(router, Process, {
  extraRules: [
    body('name').custom(name => {
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
module.exports = router;