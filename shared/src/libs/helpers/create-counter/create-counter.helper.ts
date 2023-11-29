const createCounter = (value: number) => {
  let counter = value;

  return () => counter++;
};

export { createCounter };
