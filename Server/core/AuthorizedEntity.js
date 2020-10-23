const BaseEntity = require('./BaseEntity');

class AuthorizedEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  static getJsonBase() {
    const base = BaseEntity.getJsonBase();
    base.defaults({ permissions: AuthorizedEntity.defaultPermissions });
    return base;
  }
}

AuthorizedEntity.defaultPermissions = {
  query: {
    users: ['@Any']
  },
  create: {
    users: ['@Any']
  },
  modify: {
    users: ['@Own']
  },
  remove: {
    users: ['@Own']
  }
};