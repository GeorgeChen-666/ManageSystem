const _ = require('lodash');
const { BaseEntity } = require('./BaseEntity');
const enumPermissions = Object.freeze({
  any: 0,
  user: 10,
  own: 20,
  admin: 30,
});
const enumPermissionTypes = Object.freeze({
  query: 'query',
  get: 'get',
  create: 'create',
  modify: 'modify',
  remove: 'remove',
});

class AuthorizedEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  static checkPermission(entity, type, extra = null) {
    const userPermissionType = entity.currentUser.getPermissionType();
    const permission = Math.max(this.functionPermissions[type], extra * 1);
    let result = false;
    if (userPermissionType >= permission) {
      result = true;
    } else if (permission === enumPermissions.own) {
      result = entity.createBy === entity.currentUser.username;
    }
    if (!result) {
      throw new Error('无权限');
    }
  }

  static getPermissionFilter(currentUser) {
    const permission = this.functionPermissions[enumPermissionTypes.query];
    if (currentUser) {
      const userPermissionType = currentUser.getPermissionType();
      if (userPermissionType < permission) {
        return () => false;
      }
    }
    if (permission === enumPermissions.own) {
      return (entity) => entity.createBy === currentUser.username;
    }
    return () => true;
  }

  saveRecordPermission() {
    this.constructor.checkPermission(
      this,
      this.isNew() ? enumPermissionTypes.create : enumPermissionTypes.modify
    );
    super.saveRecord();
  }

  restoreRecordPermission() {
    this.constructor.checkPermission(this, enumPermissionTypes.modify);
    super.restoreRecord();
  }

  removeRecordPermission() {
    this.constructor.checkPermission(this, enumPermissionTypes.remove);
    super.removeRecord();
  }

  realRemoveRecordPermission() {
    this.constructor.checkPermission(this, null, enumPermissions.admin);
    super.realRemoveRecord();
  }

  static getRecordById(id) {
    return super.getRecordById(id);
  }

  static findRecordsPermission(filter = null, currentUser = null) {
    const permissionFilter = this.getPermissionFilter(currentUser);
    const newFilter = [].concat(filter || []);
    newFilter.push(permissionFilter);
    return super.findRecords(newFilter);
  }

  static pageRecordsPermission(searchParams, currentUser = null) {
    const permissionFilter = this.getPermissionFilter(currentUser);
    const newFilter = [].concat(searchParams.filter || []);
    newFilter.push(permissionFilter);
    return super.pageRecords({ ...searchParams, filter: newFilter });
  }
}

AuthorizedEntity.functionPermissions = {
  [enumPermissionTypes.get]: enumPermissions.any,
  [enumPermissionTypes.query]: enumPermissions.any,
  [enumPermissionTypes.create]: enumPermissions.any,
  [enumPermissionTypes.modify]: enumPermissions.any,
  [enumPermissionTypes.remove]: enumPermissions.any,
};

// let ttt = AuthorizedEntity.getPermission('admin', 'query');
// console.log(ttt);
module.exports = { AuthorizedEntity, enumPermissions, enumPermissionTypes };
