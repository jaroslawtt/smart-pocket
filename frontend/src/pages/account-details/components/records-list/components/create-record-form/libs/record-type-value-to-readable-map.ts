import { RecordTypeValue } from '~/packages/records/libs/enums/enum.js';

const RecordTypeValueToReadable = {
  [RecordTypeValue.EXPENSE]: 'Expense',
  [RecordTypeValue.INCOME]: 'Income',
  [RecordTypeValue.TRANSFER]: 'Transfer',
} as const;

export { RecordTypeValueToReadable };
