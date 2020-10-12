const BaseEntity = require('../core/BaseEntity');
const BaseProcess = require('../core/BaseProcess');

class SystemProcess extends BaseProcess {
  constructor(config) {
    super(config);
    this.on('onData', (data) => {
      console.log('===', data);
    });
    this.run();
  }
}

class Process extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  isLoaded() {
  }

  load() {
  }

  unload() {
  }

  static loadAllActiveProcess() {
    const activeDatas = Process.findRecords(record => !record.deleted);
    activeDatas.forEach(data => {
      new Process(data).load();
    });
  }
}

Process.activeProcess = [];
Process.schema = {
  name: String,
  description: String,
  type: String,
  cmd: null,
  param: null,
  cwd: null,
  encoding: null,
  outputs: null
};
module.exports = Process;