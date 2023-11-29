import { type SubcategoryCreateRequestDto } from '~/packages/subcategories/libs/types/subcategory-create-request-dto.type.js';

type SubcategoryCreateDto = SubcategoryCreateRequestDto & { userId: string };

export { SubcategoryCreateDto };
