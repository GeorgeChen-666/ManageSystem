const _ = require('lodash');
const { BaseEntity } = require('./BaseEntity');
const enumPermissions = Object.freeze({
  any: '@Any',
  own: '@Own'
});
const PERMISSIONS_PATH_NAME = 'permissionInfo';

class AuthorizedEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  // static getJsonBase() {
  //   const base = super.getJsonBase();
  //   const permissions = {
  //     ...AuthorizedEntity.defaultPermissions,
  //     ...(this.defaultPermissions || {})
  //   };
  //   base.defaults({ [PERMISSIONS_PATH_NAME]: permissions }).write();
  //   return base;
  // }

  static getPermission(currentUser, type) {
    // const permissions = this.getObject(PERMISSIONS_PATH_NAME)
    //   .get(type)
    //   .value();
    const permissions = this.defaultPermissions;
    let info = null;
    if (_.includes(permissions, enumPermissions.any)) {
      info = enumPermissions.any;
    }
    if (_.includes(permissions, enumPermissions.own)) {
      info = enumPermissions.own;
    }
    if (_.includes(permissions, currentUser)) {
      info = currentUser;
    }
    if (
      info === null ||
      (this.username !== _.get(this.currentUser, 'username') &&
        info === enumPermissions.own &&
        !this.currentUser.isAdmin())
    ) {
      //throw new Error('无权限');
    }
    return info;
  }

  saveRecord() {
    this.constructor.getPermission(
      this.currentUser,
      this.isNew() ? 'create' : 'modify'
    );
    super.saveRecord();
  }

  restoreRecord() {
    this.constructor.getPermission(this.currentUser, 'modify');
    super.restoreRecord();
  }

  removeRecord() {
    this.constructor.getPermission(this.currentUser, 'remove');
    super.removeRecord();
  }

  realRemoveRecord() {
    this.constructor.getPermission(this.currentUser, 'remove');
    super.realRemoveRecord();
  }

  static findRecords(filter = null, currentUser = null) {
    const permission = this.getPermission(currentUser, 'query');
    const newFilter = filter || {};
    if (permission === enumPermissions.own && !currentUser.isAdmin()) {
      newFilter.createBy = currentUser;
    }
    return super.findRecords(newFilter, currentUser);
  }

  static pageRecords(searchParams, currentUser = null) {
    const permission = this.getPermission(currentUser, 'query');
    const newFilter = searchParams.filter || {};
    if (permission === enumPermissions.own && !currentUser.isAdmin()) {
      newFilter.createBy = currentUser;
    }
    return super.pageRecords({ ...searchParams, filter: newFilter }, currentUser);
  }
}

AuthorizedEntity.defaultPermissions = {
  query: [enumPermissions.own],
  create: [enumPermissions.own],
  modify: [enumPermissions.own],
  remove: [enumPermissions.own]
};

// let ttt = AuthorizedEntity.getPermission('admin', 'query');
// console.log(ttt);
module.exports = { AuthorizedEntity, enumPermissions };
