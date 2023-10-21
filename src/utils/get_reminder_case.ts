export enum RemainderRange {
  one = 'one',
  few = 'few',
  many = 'many'
}

export function getRemainderRange(num: number): RemainderRange {
  if (num > 10 && num < 20) return RemainderRange.many;
  const lastDigit = num % 10;
  switch (lastDigit) {
    case 1:
      return RemainderRange.one;
    case 2:
    case 3:
    case 4:
      return RemainderRange.few;
    default:
      return RemainderRange.many;
  }
}
