import { type CategoryGetAllItemResponseDto } from '~/packages/categories/libs/types/types.js';
import { type SubcategoryGetAllItemResponseDto } from '~/packages/subcategories/libs/types/types.js';

const categoriesToSubcategoriesList = (
  categories: CategoryGetAllItemResponseDto[],
) =>
  categories.reduce((accumulator, category) => {
    accumulator.set(category.id, category.subcategories);
    return accumulator;
  }, new Map<number, SubcategoryGetAllItemResponseDto[]>());

export { categoriesToSubcategoriesList };
