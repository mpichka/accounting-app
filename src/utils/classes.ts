/**
 * Concatenate class names
 */
export function classes(...args: unknown[]): string {
  let result = '';
  for (const arg of args) {
    if (typeof arg === 'string') {
      result = result + ' ' + arg;
    }
  }
  return result;
}
