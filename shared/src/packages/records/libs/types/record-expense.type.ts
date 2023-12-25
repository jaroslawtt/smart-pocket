import { RecordTypeValue } from '~/packages/records/libs/enums/record-type-value.enum.js';

type RecordExpense = {
  type: typeof RecordTypeValue.EXPENSE;
  categoryId?: number;
  payee: string | null;
};

export { type RecordExpense };
