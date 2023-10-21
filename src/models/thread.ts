import { RustHelper } from '@/utils/rust.helper';
import { Model } from './model';
import { ThreadLengthType } from './thread_length_type';
import { normalizeNumber } from '@/utils/normalize_number';

export class Thread extends Model {
  name?: string | null;
  length?: string | number | null;
  lengthType?: ThreadLengthType;
  constructor(entity: Thread) {
    super(entity);
    this.name = entity.name;
    this.length = normalizeNumber(entity.length);
    this.lengthType = entity.lengthType;
  }

  toJS() {
    this.name = RustHelper.toString(this.name);
    this.length = RustHelper.toString(this.length);
  }

  toRust() {
    this.name = RustHelper.toString(this.name);
    this.length = RustHelper.toNumberOptional(this.length);
  }
}
