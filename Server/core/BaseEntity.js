const appRoot = require('app-root-path');
const _ = require('lodash');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const RECORDS_PATH_NAME = 'records';
const systemProperty = Object.freeze({
  id: 'id',
  createOn: 'createOn',
  createBy: 'createBy',
  updateOn: 'updateOn',
  updateBy: 'updateBy',
});

class BaseEntity {
  constructor(source = '', currentUser = null) {
    Object.defineProperty(this, 'data', {
      enumerable: false,
      writable: true,
      value: [],
    });
    Object.defineProperty(this, 'currentUser', {
      enumerable: false,
      writable: true,
      value: currentUser,
    });
    const keys = Object.keys(this.constructor.schema);
    [...Object.values(systemProperty), ...keys].forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        set: function (value) {
          this.data[key] = value;
        },
        get: function () {
          return this.data[key];
        },
      });
    });

    if (!(_.isNaN(source) || _.isNil(source))) {
      if (_.isObject(source)) {
        this.data = source;
      } else if (_.isString(source)) {
        const id = source * 1;
        this.data = this.constructor
          .getObject(RECORDS_PATH_NAME)
          .find({ [systemProperty.id]: id })
          .value();
      }
    }
  }

  static getJsonBase() {
    const baseName = this._baseName || this.name;
    if (this.base === undefined) {
      const adapter = new FileSync(
        path.join(appRoot.path, 'storage/data', `${baseName}.json`)
      );
      this.base = low(adapter);
    }
    this.base.defaults({ [RECORDS_PATH_NAME]: this.defaultRecords }).write();
    return this.base;
  }

  static setbaseName(baseName) {
    this._baseName = baseName;
  }
  static getRecordsObject() {
    return this.getObject(RECORDS_PATH_NAME);
  }
  static getObject(path = 'meta') {
    const base = this.getJsonBase();
    base.defaults({ [path]: path.endsWith('s') ? [] : {} }).write();
    return base.read().get([path]);
  }

  static setObject(data, path = 'meta') {
    const base = this.getJsonBase();
    if (data === null) {
      base.unset(path).save();
    } else {
      base.set(path, data).save();
    }
  }

  getRawData() {
    return this.data;
  }

  getData() {
    return _.pick(this.data, Object.keys(this.constructor.schema));
  }

  isNew() {
    return !this[systemProperty.id];
  }

  saveRecord() {
    const isNew = this.isNew();
    const updateObj = this.getData();
    _.set(
      updateObj,
      systemProperty.id,
      _.get(this, systemProperty.id, new Date().getTime())
    );

    if (isNew) {
      _.set(updateObj, systemProperty.createOn, new Date().getTime());
      if (this.currentUser) {
        _.set(updateObj, systemProperty.createBy, this.currentUser.username);
      }
      this.constructor.getRecordsObject().push(updateObj).write();
    } else {
      _.set(updateObj, systemProperty.updateOn, new Date().getTime());
      if (this.currentUser) {
        _.set(updateObj, systemProperty.updateBy, this.currentUser.username);
      }
      this.constructor
        .getRecordsObject()
        .find({ [systemProperty.id]: this[systemProperty.id] })
        .assign(updateObj)
        .write();
    }
    this.data = updateObj;
  }

  removeRecord() {
    const isNew = this.isNew();
    const updateObj = this.getData();
    if (!isNew) {
      _.set(updateObj, systemProperty.updateOn, new Date().getTime());
      if (this.currentUser) {
        _.set(updateObj, systemProperty.updateBy, this.currentUser.username);
      }
      _.set(updateObj, 'deleted', true);
      this.constructor
        .getRecordsObject()
        .find({ [systemProperty.id]: this[systemProperty.id] })
        .assign(updateObj)
        .write();
      this.data = updateObj;
    }
  }

  restoreRecord() {
    const isNew = this.isNew();
    const updateObj = this.getData();
    if (!isNew) {
      _.set(updateObj, systemProperty.updateOn, new Date().getTime());
      if (this.currentUser) {
        _.set(updateObj, systemProperty.updateBy, this.currentUser.username);
      }
      _.set(updateObj, 'deleted', false);
      this.constructor
        .getRecordsObject()
        .find({ [systemProperty.id]: this[systemProperty.id] })
        .assign(updateObj)
        .write();
      this.data = updateObj;
    }
  }

  realRemoveRecord() {
    const isNew = this.isNew();
    if (!isNew) {
      this.constructor
        .getRecordsObject()
        .remove({ [systemProperty.id]: this[systemProperty.id] })
        .write();
    }
  }

  static findRecords(filter = null) {
    let obj = this.getRecordsObject();
    if (!_.isNil(filter)) {
      obj = obj.filter(filter);
    }
    return obj.value() || [];
  }

  static pageRecords({
    searchAfter = null,
    startIndex = 0,
    pageSize = 5,
    filter = null,
    sort = '',
  }) {
    let obj = this.getRecordsObject();
    if (!_.isNil(filter)) {
      obj = obj.filter(filter);
    }
    if (sort !== '') {
      const [sortKey, sortWay] = sort.split(' ');
      obj = obj.sortBy(sortKey);
      if (sortWay === 'desc') {
        obj = obj.reverse();
      }
    }
    if (searchAfter !== null) {
      const index = obj.findIndex({ id: searchAfter * 1 }).value();
      obj = obj.drop(index + 1);
    }
    return obj.take(pageSize).value();
  }
}

BaseEntity.schema = {};
BaseEntity.defaultRecords = [];
module.exports = BaseEntity;
