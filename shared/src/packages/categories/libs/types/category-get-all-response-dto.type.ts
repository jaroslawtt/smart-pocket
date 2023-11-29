import { type CategoryGetAllItemResponseDto } from '~/packages/categories/libs/types/category-get-all-item-response-dto.type.js';

type CategoryGetAllResponseDto = {
  items: CategoryGetAllItemResponseDto[];
};

export { type CategoryGetAllResponseDto };
