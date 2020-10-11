const BaseEntity = require('../core/BaseEntity');
const BaseProcess = require('../core/BaseProcess');

class Process extends BaseProcess {
  constructor(config) {
    super(config);
    this.on('onData', (data) => {
      console.log('===', data);
    });
    this.run();
  }
}

class ProcessEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }
}

ProcessEntity.schema = {
  key: null,
  description: null,
  type: null,
  cmd: null,
  param: null,
  cwd: null,
  encoding: null,
  outputs: null,
};
