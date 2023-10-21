export function validateNumberInputKey(e: any) {
  const chars = [
    '+', '-',
    '.', ',',
    '0', '1',
    '2', '3',
    '4', '5',
    '6', '7',
    '8', '9',
    'Backspace', 'Delete',
    'Home', 'End',
    'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'Enter'
  ];

  const ctrlChars = [
    'a', 'A',
    'c', 'C',
    'x', 'X',
    'v', 'V',
    'z', 'Z',
    'ф', 'Ф',
    'с', 'С',
    'ч', 'Ч',
    'м', 'М',
    'я', 'Я',
  ];

  if (e.ctrlKey && !ctrlChars.includes(e.key)) e.preventDefault();
  if (!e.ctrlKey && !chars.includes(e.key)) e.preventDefault();
}

export function validateNumberInputStatus(value?: string) {
  const number = value ? +value.replace(',', '.') : 0;
  if (Number.isNaN(number) && !Number.isFinite(number)) return 'error';
}
