import { RustHelper } from '@/utils/rust.helper';
import { Model } from './model';
import { normalizeNumber } from '@/utils/normalize_number';

export class Amortization extends Model {
  name?: string;
  price?: string | number | null;
  periodInMonths?: string | number | null;
  constructor(entity: Amortization) {
    super(entity);
    this.name = entity.name;
    this.price = normalizeNumber(entity.price);
    this.periodInMonths = normalizeNumber(entity.periodInMonths);
  }

  toJS() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toString(this.price);
    this.periodInMonths = RustHelper.toString(this.periodInMonths);
  }

  toRust() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toNumberOptional(this.price);
    this.periodInMonths = RustHelper.toNumberOptional(this.periodInMonths);
  }
}
