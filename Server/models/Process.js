const { AuthorizedEntity } = require('../core/AuthorizedEntity');
const { BaseProcess } = require('../core/BaseProcess');
const { getProcessLogsClass } = require('./ProcessLogs');
const activeProcess = new Map();

class SystemProcess extends BaseProcess {
  constructor(config) {
    super(config);
  }
}

class Process extends AuthorizedEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  isLoaded() {
    return activeProcess.has(this.name);
  }

  load() {
    const { cmd, param, cwd, encoding } = this;
    const processObj = new SystemProcess({ cmd, param, cwd, encoding });
    processObj.on('onData', (data) => {
      new (getProcessLogsClass(this.name))(this.currentUser, data).saveRecord();
    });
    if (this.autoStart) {
      processObj.run();
    }
    activeProcess.set(this.name, {
      processObj,
      ftpObj: null
    });
  }

  unload() {
    //processObj.kill();
    activeProcess.delete(this.name);
  }

  static loadAllActiveProcess() {
    const activeDataList = this.findRecordsWithoutPermission((record) => !record.deleted);
    activeDataList.forEach(({ id }) => {
      new Process(id).load();
    });
  }
}

Process.schema = {
  name: String,
  description: String,
  type: String,
  autoStart: Boolean,
  ftpPort: String,
  cmd: null,
  param: null,
  cwd: null,
  encoding: null,
  outputs: null
};

Process.loadAllActiveProcess();

module.exports = Process;
