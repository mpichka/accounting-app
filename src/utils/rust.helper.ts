export class RustHelper {
  static toNumberOptional(value: string | number | null | undefined) {
    if (value == null) return null;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value);
    throw TypeError('Value is not string or number');
  }

  static toNumber(value: string | number | null | undefined) {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value);
    throw TypeError('Value is not string or number');
  }

  static toStringOptional(value: string | number | null | undefined) {
    if (value == null) return null;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') return value;
    throw TypeError('Value is not string or number');
  }

  static toString(value: string | number | null | undefined) {
    if (value == null) return '';
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') return value;
    throw TypeError('Value is not string or number');
  }
}
