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

class SystemProcess extends BaseProcess {
  constructor(config) {
    super(config);
    FsHelper.checkOrCreateFolder(config.cwd);
    console.log(`=${config.cwd}=`);
    FsHelper.getFolderItems(config.cwd).forEach((file) => {
      console.log(file);
    });
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
          const process = activeProcess.get(this.name);
          if (process) {
            return process.isRunning;
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

  static fitData(data) {
    let isRunning = false;
    const process = activeProcess.get(data.name);
    if (process) {
      isRunning = process.processObj.isProcessRun();
    }
    return { ...data, isRunning };
  }

  sendCommand(command) {
    this.constructor.checkPermission(this, enumPermissionTypes.modify);
    const { processObj } = activeProcess.get(this.name);
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
    if (this.autoStart) {
      processObj.run();
      this.addLog('\r\n============== server started ==============\r\n');
    }
    activeProcess.set(this.name, {
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
    //processObj.kill();
    activeProcess.delete(this.name);
  }

  static loadAllActiveProcess() {
    const activeDataList = this.findRecordsWithoutPermission(
      (record) => !record.deleted
    );
    activeDataList.forEach(({ id }) => {
      new Process(id).load();
    });
  }
}

Process.schema = {
  isRunning: Boolean,
  name: String,
  description: String,
  type: String,
  autoStart: Boolean,
  ftpPort: String,
  cmd: null,
  param: null,
  //cwd: null,
  encoding: null,
  outputs: null
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
