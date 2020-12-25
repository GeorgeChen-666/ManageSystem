const express = require('express');
const _ = require('lodash');
const { body } = require('express-validator');
const router = express.Router();
const Process = require('../models/Process');
const { registerSocket } = require('../core/SocketHelper');
const { sleep } = require('../core/util');
const events = require('events');

const {
  PublicHandler,
  param2filters,
  canModify,
  canRemove,
  canRestore,
  canPageSearch
} = require('../core/RouteHelper');

registerSocket('process', (socket) => {
  //socket.emit('msg', 'process ready');
  global.events.on('onLog', ({ key = '', log }) => {
    const [, processId] = key.split('_');
    try {
      //check permission
      Process.getRecordById(processId, socket.currentUser);
      socket.emit('msg', log);
    } catch (e) {
    }
  });
});

canModify(router, Process, {
  extraRules: [
    body('name').custom((name) => {
      const results = Process.findRecords({ name });
      if (results.length) {
        throw new Error('名称重复');
      }
      return true;
    })
  ],
  onFinish: async (entityData) => {
    const { isRunning, autoStart } = entityData;
    entityData.unload();
    if (isRunning || autoStart) {
      await sleep(100);
      entityData.load();
    }
  }
});
canRemove(router, Process, {});
canRestore(router, Process, {});
canPageSearch(router, Process, {});
router.post(
  '/:id/pageLogs/sendCommand',
  [body('command').exists().withMessage('请传入command')],
  PublicHandler(function(req, res) {
    const { id } = req.params;
    const command = _.get(req.body, ['command']);
    const entity = new Process(id, req.currentUser);
    entity.sendCommand(command);
    res.json({
      message: 'success'
    });
  })
);
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
    const items = Process.pageProcessLogs(
      id * 1,
      {
        searchAfter,
        pageSize,
        filter,
        sort
      }
    );
    const total = Process.findProcessLogs(id * 1, filter).length;
    res.json({
      items,
      total
    });
  })
);
router.patch(
  ['/modify/:id/modifyTask', '/modify/:id/modifyTask/:taskId'],
  [],
  PublicHandler(function(req, res, next) {
    const { id, taskId } = req.params;
    const processObject = new Process(id, req.currentUser);
    const taskData = { ...req.body, id: taskId * 1 };
    processObject.modifyTask(taskData);
    res.json({
      message: 'modifyTask',
      data: processObject.getFitData()
    });
  })
);
module.exports = router;
