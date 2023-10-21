export class Model {
  id?: number;
  createdAt?: number;
  updatedAt?: number;

  constructor(entity: Model) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  toJS() {
    throw new Error('Function toJS is not implemented');
  }

  toRust() {
    throw new Error('Function toRust is not implemented');
  }

  convertToJS() {
    this.toJS();
    for (const key of Object.keys(this)) {
      if (this[key] instanceof Model) {
        this[key].convertToJS();
      }
      if (Array.isArray(this[key])) {
        for (const item of this[key]) {
          if (item instanceof Model) {
            item.convertToJS();
          }
        }
      }
    }
    return this;
  }

  convertToRust() {
    this.toRust();
    for (const key of Object.keys(this)) {
      if (this[key] instanceof Model) {
        this[key].convertToRust();
      }
      if (Array.isArray(this[key])) {
        for (const item of this[key]) {
          if (item instanceof Model) {
            item.convertToRust();
          }
        }
      }
    }
    return this;
  }
}
