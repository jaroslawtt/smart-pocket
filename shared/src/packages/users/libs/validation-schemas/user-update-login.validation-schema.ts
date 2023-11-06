import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdateLoginRequestDto } from '~/packages/users/libs/types/user-update-login-request-dto.type.js';

const userUpdateLogin = joi.object<UserUpdateLoginRequestDto, true>({
  login: joi
    .string()
    .pattern(UserValidationRule.EMAIL_REGEX)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.EMAIL_IS_INVALID,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { userUpdateLogin };
