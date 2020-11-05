const _ = require('lodash');
const { BaseEntity } = require('./BaseEntity');
const enumPermissions = Object.freeze({
  any: '@Any',
  own: '@Own',
  admin: '@Admin'
});
const enumPermissionTypes = Object.freeze({
  filter: 'filter',
  query: 'query',
  get: 'get',
  create: 'create',
  modify: 'modify',
  remove: 'remove'
});

//const PERMISSIONS_PATH_NAME = 'permissionInfo';

class AuthorizedEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  static getPermission(currentUser, type) {
    const permissions = this.defaultPermissions[type];
    let info = null;
    if (_.includes(permissions, enumPermissions.any)) {
      info = enumPermissions.any;
    }
    else if (_.includes(permissions, enumPermissions.own)) {
      info = enumPermissions.own;
    }
    if (_.includes(permissions, currentUser)) {
      info = currentUser;
    }
    // if (
    //   info === null ||
    //   (this.username !== _.get(this.currentUser, 'username') &&
    //     info === enumPermissions.own &&
    //     !this.currentUser.isAdmin())
    // )
    return info;
  }

  static getPermissionFilter(currentUser, type) {
    const permission = this.getPermission(currentUser, type);
  }

  saveRecord() {
    const proInfo = this.constructor.getPermission(
      this.currentUser,
      this.isNew() ? enumPermissionTypes.create : enumPermissionTypes.modify
    );
    super.saveRecord();
  }

  restoreRecord() {
    this.constructor.getPermission(this.currentUser, enumPermissionTypes.modify);
    super.restoreRecord();
  }

  removeRecord() {
    this.constructor.getPermission(this.currentUser, enumPermissionTypes.remove);
    super.removeRecord();
  }

  realRemoveRecord() {
    this.constructor.getPermission(this.currentUser, enumPermissionTypes.remove);
    super.realRemoveRecord();
  }

  static findRecords(filter = null, currentUser = null) {
    const permission = this.getPermission(currentUser, enumPermissionTypes.query);
    const newFilter = filter || [];
    if (permission === enumPermissions.own && !currentUser.isAdmin()) {
      newFilter.createBy = currentUser;
    }
    return super.findRecords(newFilter, currentUser);
  }

  static pageRecords(searchParams, currentUser = null) {
    const permission = this.getPermission(currentUser, enumPermissionTypes.query);

    const newFilter = searchParams.filter || [];
    if (permission === enumPermissions.own && !currentUser.isAdmin()) {
      newFilter.createBy = currentUser;
    }
    return super.pageRecords(
      { ...searchParams, filter: newFilter },
      currentUser
    );
  }
}

AuthorizedEntity.defaultPermissions = {
  [enumPermissionTypes.get]: [enumPermissions.any],
  [enumPermissionTypes.query]: [enumPermissions.any],
  [enumPermissionTypes.filter]: [enumPermissions.any],
  [enumPermissionTypes.create]: [enumPermissions.any],
  [enumPermissionTypes.modify]: [enumPermissions.any],
  [enumPermissionTypes.remove]: [enumPermissions.any]
};

// let ttt = AuthorizedEntity.getPermission('admin', 'query');
// console.log(ttt);
module.exports = { AuthorizedEntity, enumPermissions, enumPermissionTypes };
