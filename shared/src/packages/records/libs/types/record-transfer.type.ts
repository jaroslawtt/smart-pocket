import { RecordTypeValue } from '~/packages/records/libs/enums/record-type-value.enum.js';

type RecordTransfer = {
  type: typeof RecordTypeValue.TRANSFER;
  fromAccountId: string;
  toAccountId: string;
};

export { type RecordTransfer };
