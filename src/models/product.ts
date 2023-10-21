import { RustHelper } from '@/utils/rust.helper';
import { Accessory } from './accessory';
import { Amortization } from './amortization';
import { Bead } from './bead';
import { BeadsQuality } from './beads_quality';
import { GerdanType } from './gerdan_type';
import { Model } from './model';
import { Package } from './package';
import { Thread } from './thread';
import { normalizeNumber } from '@/utils/normalize_number';

export class Product extends Model {
  schemaPrice?: string | number | null;
  schemaAuthor?: string | null;
  name?: string | null;
  category?: string | null;
  gerdanType?: GerdanType;
  weight?: string | number | null;
  length?: string | number | null;
  width?: string | number | null;
  estimate?: string | number | null;
  surcharge?: string | number | null;
  marge?: string | number | null;
  beadsQuality?: BeadsQuality;
  beadsTotalWeight?: string | number | null;
  threadsTotalPrice?: string | number | null;
  totalPrice?: string | number | null;
  image: string | null;
  preview: string | null;
  beads: Bead[];
  accessories: Accessory[];
  threads: Thread[];
  packages: Package[];
  amortizations: Amortization[];

  constructor(product: Product) {
    super(product);
    this.schemaPrice = normalizeNumber(product.schemaPrice);
    this.name = product.name;
    this.gerdanType = product.gerdanType;
    this.weight = normalizeNumber(product.weight);
    this.length = normalizeNumber(product.length);
    this.width = normalizeNumber(product.width);
    this.estimate = normalizeNumber(product.estimate);
    this.surcharge = normalizeNumber(product.surcharge);
    this.marge = normalizeNumber(product.marge);
    this.beadsQuality = product.beadsQuality;
    this.beadsTotalWeight = normalizeNumber(product.beadsTotalWeight);
    this.threadsTotalPrice = normalizeNumber(product.threadsTotalPrice);
    this.image = product.image;
    this.preview = product.preview;
    this.totalPrice = normalizeNumber(product.totalPrice);
    this.beads = product.beads
      ? product.beads.map((item) => new Bead(item))
      : [];
    this.accessories = product.accessories
      ? product.accessories.map((item) => new Accessory(item))
      : [];
    this.threads = product.threads
      ? product.threads.map((item) => new Thread(item))
      : [];
    this.packages = product.packages
      ? product.packages.map((item) => new Package(item))
      : [];
    this.amortizations = product.amortizations
      ? product.amortizations.map((item) => new Amortization(item))
      : [];
  }

  toJS() {
    this.schemaPrice = RustHelper.toStringOptional(this.schemaPrice);
    this.name = RustHelper.toString(this.name);
    this.weight = RustHelper.toStringOptional(this.weight);
    this.length = RustHelper.toStringOptional(this.length);
    this.width = RustHelper.toStringOptional(this.width);
    this.estimate = RustHelper.toStringOptional(this.estimate);
    this.surcharge = RustHelper.toStringOptional(this.surcharge);
    this.marge = RustHelper.toStringOptional(this.marge);
    this.beadsTotalWeight = RustHelper.toStringOptional(this.beadsTotalWeight);
    this.threadsTotalPrice = RustHelper.toStringOptional(
      this.threadsTotalPrice
    );
    this.image = RustHelper.toStringOptional(this.image);
    this.preview = RustHelper.toStringOptional(this.preview);
    this.totalPrice = RustHelper.toStringOptional(this.totalPrice);
  }

  toRust() {
    this.schemaPrice = RustHelper.toNumberOptional(this.schemaPrice);
    this.name = RustHelper.toString(this.name);
    this.weight = RustHelper.toNumberOptional(this.weight);
    this.length = RustHelper.toNumberOptional(this.length);
    this.width = RustHelper.toNumberOptional(this.width);
    this.estimate = RustHelper.toNumberOptional(this.estimate);
    this.surcharge = RustHelper.toNumberOptional(this.surcharge);
    this.marge = RustHelper.toNumberOptional(this.marge);
    this.beadsTotalWeight = RustHelper.toNumberOptional(this.beadsTotalWeight);
    this.threadsTotalPrice = RustHelper.toNumberOptional(
      this.threadsTotalPrice
    );
    this.image = RustHelper.toStringOptional(this.image);
    this.preview = RustHelper.toStringOptional(this.preview);
    this.totalPrice = RustHelper.toNumberOptional(this.totalPrice);
  }
}
