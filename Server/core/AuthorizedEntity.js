const BaseEntity = require('./BaseEntity');

class AuthorizedEntity extends BaseEntity {
  constructor(source, currentUser) {
    super(source, currentUser);
  }

  static getJsonBase() {
    const base = BaseEntity.getJsonBase();
    base.defaults({ permissions: AuthorizedEntity.permissions });
    return base;
  }
}

AuthorizedEntity.permissions = {};