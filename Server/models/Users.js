const crypto = require('crypto');
const _ = require('lodash');
const {
  AuthorizedEntity,
  enumPermissions,
  enumPermissionTypes
} = require('../core/AuthorizedEntity');

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
    return _.get(this.findRecordsWithoutPermission({ username }), 0);
  }

  getPermissionType() {
    return this.permissionType || enumPermissions.user;
  }

  savePermissionType(type) {
    if (this.isNew()) {
      throw new Error('请先保存');
    }
    this.permissionType = type;
    super.saveRecordPermission();
  }

  saveRecord() {
    if (this.isNew()) {
      const count = this.constructor.findRecordsWithoutPermission({ username: this.username }).length;
      if (count > 0) {
        throw new Error('用户名重复');
      }
    }
    // delete this.data.permissionType;
    super.saveRecord();
  }

  static fitData(data) {
    const newData = { ...data };
    delete newData.password;
    return newData;
  }
};
Users.schema = {
  username: {
    type: String,
    permission: {}
  },
  password: String,
  errorTimes: Number,
  lock: Boolean,
  lastLoginTime: Number,
  servers: Array,
  permissionType: Number
};
Users.defaultRecords = [
  {
    username: 'admin',
    password: Users.md5('112233'),
    permissionType: enumPermissions.admin,
    id: 1
  }
];
Users.functionPermissions = {
  [enumPermissionTypes.get]: enumPermissions.own,
  [enumPermissionTypes.query]: enumPermissions.own,
  [enumPermissionTypes.create]: enumPermissions.admin,
  [enumPermissionTypes.modify]: enumPermissions.own,
  [enumPermissionTypes.remove]: enumPermissions.own
};
//const uuu = new Users("xiaoming", "");
// uuu.password = "112233";
// uuu.username = "xiaoming";
// uuu.saveRecord();
// console.log(
//   Users.pageRecords({
//     filter: { password: 'd0970714757783e6cf17b26fb8e2298f' },
//     filterFun: (obj) => {
//       return obj.filter((row) => {
//         return ['admin'].includes(row.username);
//       });
//     },
//   })
// );

module.exports = Users;
