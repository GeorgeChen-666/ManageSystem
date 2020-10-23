const crypto = require('crypto');
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
      set: function (value) {
        this.data['password'] = Users.md5(value);
      },
      get: function () {
        return this.data['password'];
      },
    });
  }

  static md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  static getUserByName(username) {
    return Users.findRecords({ username })[0];
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
};
Users.schema = {
  username: String,
  password: String,
  errorTimes: Number,
  lock: Boolean,
  lastLoginDate: Number,
  servers: Array,
  permissions: Array,
};
Users.defaultRecords = [
  {
    username: 'admin',
    password: Users.md5('112233'),
    permissions: [SUPER_PERMISSION],
    id: 1,
  },
];

//const uuu = new Users("xiaoming", "");
// uuu.password = "112233";
// uuu.username = "xiaoming";
// uuu.saveRecord();
//console.log(Users.pageRecords({ searchAfter: '1602306639695' })); //
//console.log(Users.VerifyPassword("admin", "1112233"))

module.exports = Users;
