export function normalizeNumber(value: any): number {
  const number = typeof value === 'string' ? +value.replace(',', '.') : value;
  if (Number.isNaN(number) || !Number.isFinite(number)) return 0;
  return number;
}
