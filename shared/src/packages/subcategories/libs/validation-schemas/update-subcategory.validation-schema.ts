import joi from 'joi';
import { type SubcategoryUpdateRequestDto } from '~/packages/subcategories/libs/types/subcategory-update-request-dto.type.js';
import { SubcategoryValidationMessage } from '~/packages/subcategories/libs/enums/enums.js';

const updateSubcategory = joi.object<SubcategoryUpdateRequestDto, true>({
  name: joi.string().required().messages({
    'string:empty': SubcategoryValidationMessage.NAME_REQUIRE,
  }),
  categoryId: joi.number().min(1).required(),
});

export { updateSubcategory };
