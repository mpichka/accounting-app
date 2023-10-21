import { RustHelper } from '@/utils/rust.helper';
import { Model } from './model';
import { AccessoryPriceType } from './accessory_price_type';
import { normalizeNumber } from '@/utils/normalize_number';

export class Accessory extends Model {
  name?: string;
  price?: string | number | null;
  priceType?: AccessoryPriceType;
  amount?: string | number | null;
  constructor(entity: Accessory) {
    super(entity);
    this.name = entity.name;
    this.price = normalizeNumber(entity.price);
    this.priceType = entity.priceType;
    this.amount = normalizeNumber(entity.amount);
  }

  toJS() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toString(this.price);
    this.amount = RustHelper.toString(this.amount);
  }

  toRust() {
    this.name = RustHelper.toString(this.name);
    this.price = RustHelper.toNumberOptional(this.price);
    this.amount = RustHelper.toNumberOptional(this.amount);
  }
}
