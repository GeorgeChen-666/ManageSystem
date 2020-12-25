const {
  AuthorizedEntity,
  enumPermissions,
  enumPermissionTypes
} = require('../core/AuthorizedEntity');
const { BaseProcess } = require('../core/BaseProcess');
const { getProcessLogsClass } = require('./ProcessLogs');
const appRoot = require('app-root-path');
const FsHelper = require('../core/FsHelper');
const path = require('path');
const activeProcess = new Map();
const fs = require('fs');
const _ = require('lodash');

class SystemProcess extends BaseProcess {
  constructor(config) {
    super(config);
    console.log('cwd' + config.cwd);
    FsHelper.checkOrCreateFolder(config.cwd);
  }
}

class Process extends AuthorizedEntity {
  constructor(id, currentUser) {
    super(id, currentUser);
    Object.defineProperty(this, 'isRunning', {
      configurable: true,
      enumerable: true,
      get: function() {
        try {
          const process = activeProcess.get(this.id);
          if (process) {
            return process.processObj.isProcessRun();
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    });
    this.cwd = path.join(appRoot.path, `/storage/program/${this.id}`);
  }

  setData(data) {
    super.setData(data);
    if (data.file.length > 0) {
      const [{ fileName, base64 }] = data.file;
      const dataBuffer = new Buffer(base64, 'base64');
      fs.writeFileSync(path.join(this.cwd, fileName), dataBuffer);
    }
  }

  static fitData(data) {
    let isRunning = false;
    const process = activeProcess.get(data.id);
    if (process) {
      isRunning = process.processObj.isProcessRun();
    }
    return { ...data, isRunning };
  }

  sendCommand(command) {
    this.constructor.checkPermission(this, enumPermissionTypes.modify);
    const { processObj } = activeProcess.get(this.id);
    processObj.sendCommand(command);
  }

  addLog(log) {
    new (getProcessLogsClass(this.id))(log).saveRecord();
  }

  load() {
    const { cmd, param, cwd, encoding } = this;
    const processObj = new SystemProcess({ cmd, param, cwd, encoding });
    processObj.on('onData', (data) => {
      this.addLog(data);
    });
    processObj.on('onExit', (data) => {
      this.addLog('\r\n============== server stopped ==============\r\n');
    });
    processObj.on('onRun', (data) => {
      this.addLog('\r\n============== server started ==============\r\n');
    });

    if (this.autoStart) {
      processObj.run();

    }
    activeProcess.set(this.id, {
      processObj,
      ftpObj: null
    });
  }

  static pageRecords(...args) {
    const datas = super.pageRecords(...args);
    datas.forEach((data) => {
      const cwd = path.join(appRoot.path, `/storage/program/${data.id}`);
      console.log('==', FsHelper.getFolderItems(cwd));
      data.exeOptions = FsHelper.getFolderItems(cwd);
    });
    return datas;
  }

  static pageProcessLogs(id, params) {
    const entity = new this(id);
    return getProcessLogsClass(entity.id).pageRecords(params);
  }

  static findProcessLogs(id, params) {
    const entity = new this(id);
    return getProcessLogsClass(entity.id).findRecords(params);
  }

  unload() {
    const process = activeProcess.get(this.id);
    if (process) {
      process.processObj.killProcess();
      activeProcess.delete(this.id);
    }
  }

  static loadAllActiveProcess() {
    const activeDataList = this.findRecordsWithoutPermission(
      (record) => !record.deleted
    );
    activeDataList.forEach(({ id }) => {
      new Process(id).load();
    });
  }

  modifyTask(taskData) {
    const tasks = this.tasks || [];
    if (taskData.id) {
      const findIndex = _.findIndex(tasks, { id: taskData.id });
      if (findIndex > -1) {
        _.set(tasks, findIndex, { ...tasks[findIndex], ...taskData });
      }
    } else {
      taskData.id = new Date().getTime();
      tasks.push(taskData);
      this.tasks = tasks;
    }
    this.saveRecord();
  }
}

Process.schema = {
  isRunning: Boolean,
  name: String,
  description: String,
  autoStart: Boolean,
  ftpPort: String,
  tasks: [],
  cmd: null,
  param: null,
  encoding: null
};
Process.functionPermissions = {
  [enumPermissionTypes.get]: enumPermissions.own,
  [enumPermissionTypes.query]: enumPermissions.own,
  [enumPermissionTypes.create]: enumPermissions.own,
  [enumPermissionTypes.modify]: enumPermissions.own,
  [enumPermissionTypes.remove]: enumPermissions.own
};
setTimeout(() => {
  Process.loadAllActiveProcess();
}, 5000);

module.exports = Process;
