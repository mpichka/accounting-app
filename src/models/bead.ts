import { RustHelper } from '@/utils/rust.helper';
import { Model } from './model';
import { normalizeNumber } from '@/utils/normalize_number';

export class Bead extends Model {
  name: string;
  price: string | number | null;
  constructor(entity: Bead) {
    super(entity);
    this.name = entity.name;
    this.price = normalizeNumber(entity.price);
  }

  toJS() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toString(this.price);
  }

  toRust() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toNumberOptional(this.price);
  }
}
