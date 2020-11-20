const { BaseEntity } = require('../core/BaseEntity');

function getProcessLogsClass(processName) {
  const ProcessLogs = class extends BaseEntity {
    constructor(log) {
      super(null, null);
      this.log = log;
    }

    saveRecord() {
      super.saveRecord();
      // TODO 也许能优化
      const datas = this.constructor.pageRecords({
        pageSize: 2000,
        sort: 'updateOn desc'
      });
      if (datas.length === 2000) {
        const oldestDate = datas.pop().updateOn;
        this.constructor
          ._getRecordsObject()
          .remove((record) => record.updateOn < oldestDate)
          .write();
      }
    }

    removeRecord() {
      throw new Error('not supported');
    }

    restoreRecord() {
      throw new Error('not supported');
    }

    realRemoveRecord() {
      throw new Error('not supported');
    }
  };
  ProcessLogs.schema = {
    log: null
  };
  ProcessLogs._baseName = `ProcessLogs_${processName}`;
  return ProcessLogs;
}

module.exports = { getProcessLogsClass };
