const crypto = require('crypto');
const _ = require('lodash');
const { AuthorizedEntity } = require('../core/AuthorizedEntity');
const SUPER_PERMISSION = '*';
const express = require('express');

const Users = class extends AuthorizedEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
    if (this.currentUser === null) {
      this.currentUser = this;
    }
    Object.defineProperty(this, 'password', {
      configurable: true,
      enumerable: false,
      set: function(value) {
        this.data['password'] = Users.md5(value);
      },
      get: function() {
        return this.data['password'];
      }
    });
  }

  static md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  static getUserByName(username) {
    return _.get(Users.findRecords({ username }), 0);
  }

  isAdmin() {
    const permissions = this.permissions;
    return _.includes(permissions, '*');
  }

  saveRecord() {
    if (this.isNew()) {
      const count = Users.findRecords({ username: this.username }).length;
      if (count > 0) {
        throw new Error('用户名重复');
      }
    }
    super.saveRecord.call(this);
  }

  static fitData(data) {
    const newData = { ...data };
    delete newData.password;
    return newData;
  }
};
Users.schema = {
  username: String,
  password: String,
  errorTimes: Number,
  lock: Boolean,
  lastLoginTime: Number,
  servers: Array,
  permissions: Array
};
Users.defaultRecords = [
  {
    username: 'admin',
    password: Users.md5('112233'),
    permissions: [SUPER_PERMISSION],
    id: 1
  }
];

//const uuu = new Users("xiaoming", "");
// uuu.password = "112233";
// uuu.username = "xiaoming";
// uuu.saveRecord();
console.log(Users.pageRecords({
  filter: { password: 'd0970714757783e6cf17b26fb8e2298f' }, filterFun: (obj) => {
    return obj.filter((row) => {
      return ['admin'].includes(row.username);
    });
  }
}));

const filterParam = [{
  'propertyName': 'lifecycleStatus',
  'value': ['Submitted', 'Archived'],
  'type': 'terms',
  'operator': null
}];
module.exports = Users;
