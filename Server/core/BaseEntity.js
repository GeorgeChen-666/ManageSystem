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
  constructor(id = null, currentUser = null) {
    let cUser = currentUser;
    if (currentUser === '@') {
      cUser = this;
    }
    Object.defineProperty(this, 'data', {
      enumerable: false,
      writable: true,
      value: {},
    });
    Object.defineProperty(this, 'currentUser', {
      enumerable: false,
      writable: true,
      value: cUser,
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
    if (id) {
      this.data = this.constructor._findById(id).value();
    } else {
      this.data = {};
    }
  }

  static _getJsonBase() {
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

  static _getRecordsObject() {
    return this._getObject(RECORDS_PATH_NAME);
  }

  static _getObject(path = 'meta') {
    const base = this._getJsonBase();
    base.defaults({ [path]: path.endsWith('s') ? [] : {} }).write();
    return base.read().get([path]);
  }

  static setObject(data, path = 'meta') {
    const base = this._getJsonBase();
    if (data === null) {
      base.unset(path).save();
    } else {
      base.set(path, data).save();
    }
  }

  getRawData() {
    return this.data;
  }

  setData(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }

  getData() {
    return _.pick(this.data, Object.keys(this.constructor.schema));
  }

  isNew() {
    return !this[systemProperty.id];
  }

  static fitData(data) {
    return data;
  }

  getFitData() {
    return this.constructor.fitData(this.getRawData());
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
      this.constructor._getRecordsObject().push(updateObj).write();
    } else {
      _.set(updateObj, systemProperty.updateOn, new Date().getTime());
      if (this.currentUser) {
        _.set(updateObj, systemProperty.updateBy, this.currentUser.username);
      }
      this.constructor
        ._getRecordsObject()
        .find({ [systemProperty.id]: this[systemProperty.id] })
        .assign(updateObj)
        .write();
    }
    this.data = updateObj;
  }

  static _findById(id) {
    return this._getRecordsObject().find({
      [systemProperty.id]: id * 1,
    });
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
        ._findById(this[systemProperty.id])
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
        ._findById(this[systemProperty.id])
        .assign(updateObj)
        .write();
      this.data = updateObj;
    }
  }

  realRemoveRecord() {
    const isNew = this.isNew();
    if (!isNew) {
      this.constructor
        ._getRecordsObject()
        .remove({ [systemProperty.id]: this[systemProperty.id] })
        .write();
    }
  }

  static getRecordById(id) {
    return this._findById(id * 1).value();
  }

  static getEntityByData(data, currentUser) {
    const entity = new this(data.id, currentUser);
    entity.setData(data);
    return entity;
  }

  static findRecords(filter = null) {
    let obj = this._getRecordsObject();
    const filterArray = [].concat(filter).filter((e) => e);
    obj = filterArray.reduce((to, cu) => {
      return to.filter(cu);
    }, obj);
    return obj.value() || [];
  }

  static pageRecords({
    searchAfter = null,
    pageSize = 10,
    filter = null,
    sort = '',
  }) {
    let obj = this._getRecordsObject();
    const filterArray = [].concat(filter).filter((e) => e);
    obj = filterArray.reduce((to, cu) => {
      return to.filter(cu);
    }, obj);
    if (sort !== '') {
      const [sortKey, sortWay] = sort.split(' ');
      obj = obj.sortBy(sortKey);
      if (sortWay === 'desc') {
        obj = obj.reverse();
      }
    }
    if (searchAfter !== null) {
      const index = obj
        .findIndex({ [systemProperty.id]: searchAfter * 1 })
        .value();
      obj = obj.drop(index + 1);
    }
    return obj.take(pageSize).value() || [];
  }
}

BaseEntity.schema = {};
BaseEntity.defaultRecords = [];
module.exports = { BaseEntity, systemProperty };
