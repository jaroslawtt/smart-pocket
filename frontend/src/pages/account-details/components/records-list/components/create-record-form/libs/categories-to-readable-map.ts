import { type CategoryGetAllItemResponseDto } from 'shared/build/index.js';

const categoriesToReadableMap = (categories: CategoryGetAllItemResponseDto[]) =>
  categories.reduce(
    (accumulator, category) => {
      accumulator[category.name] = category.id;

      return accumulator;
    },
    {} as Record<string, number>,
  );

export { categoriesToReadableMap };
