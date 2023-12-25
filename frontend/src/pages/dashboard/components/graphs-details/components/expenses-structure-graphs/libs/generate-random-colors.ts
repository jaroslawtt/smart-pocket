const generateRandomColors = (length: number) => {
  const myColors = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  return Array.from({ length, }, () => {
    let color = '#';

    for (let i = 1; i <= 6; i++) {
      color += myColors[Math.floor(Math.random() * myColors.length)];
    }

    return color;
  });
};

export { generateRandomColors };
