import { type SubcategoryUpdateRequestDto } from '~/packages/subcategories/libs/types/subcategory-update-request-dto.type.js';

type SubcategoryUpdateDto = SubcategoryUpdateRequestDto & {
  id: number;
  userId: string;
};

export { type SubcategoryUpdateDto };
