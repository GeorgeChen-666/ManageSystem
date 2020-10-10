const appRoot = require('app-root-path');
const crypto = require("crypto");
const BaseEntity = appRoot.require("/core/BaseEntity");
const SUPER_PERMISSION = "*";

const Users = class extends BaseEntity {
  constructor(source = "", currentUser = "") {
    super(source, currentUser);
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      set: function (value) {
        this.data["password"] = Users.md5(value);
      },
      get: function () {
        return this.data["password"];
      },
    });
  }

  static md5(text) {
    return crypto.createHash("md5").update(text).digest("hex");
  }

  static pageRecords({startIndex, pageSize, filter, sort}) {
    return BaseEntity.pageRecords.call(this, {startIndex, pageSize, filter, sort});
  }

  static getUserByName(username) {
    return (Users.findRecords({username}) || [])[0]
  }

  saveRecord() {
    if (this.isNew()) {
      const count = Users.findRecords({username: this.username}).length;
      if (count > 0) {
        throw new Error("用户名重复");
      }
    }
    super.saveRecord.call(this);
  }
};
Users.schema = {
  username: null,
  password: null,
  errorTimes: null,
  lock: null,
  lastLoginDate: null,
  servers: null,
  permissions: null
};
Users.defaultRecords = [
  {
    "username": "admin",
    "password": "d0970714757783e6cf17b26fb8e2298f",
    "permissions": [SUPER_PERMISSION],
    "id": 1
  }
];

//const uuu = new Users("xiaoming", "");
// uuu.password = "112233";
// uuu.username = "xiaoming";
// uuu.saveRecord();
//console.log(Users.pageRecords("2gou", 0, 5)); //
//console.log(Users.VerifyPassword("admin", "1112233"))

module.exports = Users;