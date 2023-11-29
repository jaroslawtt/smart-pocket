import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/record-get-all-item-response-dto.type.js';

type RecordGetAllResponseDto = {
  items: RecordGetAllItemResponseDto[];
};

export { RecordGetAllResponseDto };
