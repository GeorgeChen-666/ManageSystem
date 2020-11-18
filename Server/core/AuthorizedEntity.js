const _ = require('lodash');
const { BaseEntity, systemProperty } = require('./BaseEntity');
const enumPermissions = Object.freeze({
  any: 0,
  user: 10,
  own: 20,
  admin: 30
});
const enumPermissionTypes = Object.freeze({
  query: 'query',
  get: 'get',
  create: 'create',
  modify: 'modify',
  remove: 'remove'
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
      result = entity.createBy === entity.currentUser.username || (this.name === 'Users' && entity.username === entity.currentUser.username);
    }
    if (!result) {
      throw new Error('无权限');
    }
  }

  static getPermissionFilter(currentUser) {
    const permission = this.functionPermissions[enumPermissionTypes.query];
    if (currentUser) {
      const userPermissionType = currentUser.getPermissionType();
      if (userPermissionType >= permission) {
        return () => true;
      } else if (permission === enumPermissions.own) {
        return (entity) =>
          entity.createBy === currentUser.username ||
          entity.username === currentUser.username;
      }
    }

    return () => false;
  }

  saveRecordWithoutPermission() {
    super.saveRecord();
  }

  saveRecord() {
    this.constructor.checkPermission(
      this,
      this.isNew() ? enumPermissionTypes.create : enumPermissionTypes.modify
    );
    super.saveRecord();
  }

  restoreRecordWithoutPermission() {
    super.restoreRecord();
  }

  restoreRecord() {
    this.constructor.checkPermission(this, enumPermissionTypes.modify);
    super.restoreRecord();
  }

  removeRecordWithoutPermission() {
    super.removeRecord();
  }

  removeRecord() {
    this.constructor.checkPermission(this, enumPermissionTypes.remove);
    super.removeRecord();
  }

  realRemoveRecordWithoutPermission() {
    super.realRemoveRecord();
  }

  realRemoveRecord() {
    this.constructor.checkPermission(this, null, enumPermissions.admin);
    super.realRemoveRecord();
  }

  // static getRecordById(id) {
  //   return super.getRecordById(id);
  // }

  static findRecordsWithoutPermission(filter) {
    return super.findRecords(filter);
  }

  static getRecordByIdWithoutPermission(id) {
    const [record] = this.findRecordsWithoutPermission({
      [systemProperty.id]: id * 1
    });
    return record;
  }

  static getRecordById(id, currentUser) {
    const [record] = this.findRecords(
      { [systemProperty.id]: id * 1 },
      currentUser
    );
    return record;
  }

  static findRecords(filter = null, currentUser = null) {
    const permissionFilter = this.getPermissionFilter(currentUser);
    const newFilter = [].concat(filter || []);
    newFilter.push(permissionFilter);
    return super.findRecords(newFilter);
  }

  static pageRecordsWithoutPermission(searchParams) {
    return super.pageRecords({ ...searchParams });
  }

  static pageRecords(searchParams, currentUser = null) {
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
  [enumPermissionTypes.remove]: enumPermissions.any
};

// let ttt = AuthorizedEntity.getPermission('admin', 'query');
// console.log(ttt);
module.exports = { AuthorizedEntity, enumPermissions, enumPermissionTypes };
