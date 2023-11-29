import { SubcategoryGetAllItemResponseDto } from '~/packages/subcategories/libs/types/subcategory-get-all-item-response-dto.type';

type CategoryGetAllItemResponseDto = {
  id: number;
  name: string;
  subcategories: Array<SubcategoryGetAllItemResponseDto>;
};

export { type CategoryGetAllItemResponseDto };
