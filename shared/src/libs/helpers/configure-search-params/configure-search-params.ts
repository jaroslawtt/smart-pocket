const configureSearchParams = <T extends Record<PropertyKey, unknown>>(
  obj: T,
): URLSearchParams => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => typeof value === 'string'),
    ) as Record<PropertyKey, string>,
  );
};

export { configureSearchParams };
