import { RecordTypeValue } from '~/packages/records/libs/enums/record-type-value.enum.js';

type RecordIncome = {
  type: typeof RecordTypeValue.INCOME;
  accountId: string;
  categoryId: number | null;
  payer: string | null;
};

export { RecordIncome };
