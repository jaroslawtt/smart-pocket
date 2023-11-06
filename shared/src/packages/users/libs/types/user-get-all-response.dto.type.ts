import { type UserGetAllItemResponseDto } from '~/packages/users/libs/types/user-get-all-item-response-dto.type.js';

type UserGetAllResponseDto = {
  items: UserGetAllItemResponseDto[];
};

export { type UserGetAllResponseDto };
