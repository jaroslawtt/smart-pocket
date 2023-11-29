import joi from 'joi';
import { type SubcategoryCreateRequestDto } from '~/packages/subcategories/libs/types/subcategory-create-request-dto.type.js';
import { SubcategoryValidationMessage } from '~/packages/subcategories/libs/enums/enums.js';

const createSubcategory = joi.object<SubcategoryCreateRequestDto, true>({
  name: joi.string().required().messages({
    'string:empty': SubcategoryValidationMessage.NAME_REQUIRE,
  }),
  categoryId: joi.number().min(1).required(),
});

export { createSubcategory };
