import { type SubcategoryGetAllItemResponseDto } from '~/packages/subcategories/libs/types/types.js';

const subcategoriesToReadableMap = (
  subcategories: SubcategoryGetAllItemResponseDto[],
) =>
  subcategories.reduce(
    (accumulator, subcategory) => {
      accumulator[subcategory.name] = subcategory.id;

      return accumulator;
    },
    {} as Record<string, number>,
  );

export { subcategoriesToReadableMap };
