import { type RecordTransfer } from '~/packages/records/libs/types/record-transfer.type.js';
import { type RecordExpense } from '~/packages/records/libs/types/record-expense.type.js';
import { type RecordIncome } from '~/packages/records/libs/types/record-income.type.js';

type RecordCreateTransferRequestDto = RecordCreateTypeRequestDto &
  RecordTransfer;

type RecordCreateExpenseRequestDto = RecordCreateTypeRequestDto & RecordExpense;

type RecordCreateIncomeRequestDto = RecordCreateTypeRequestDto & RecordIncome;

type RecordCreateTypeRequestDto = {
  accountId: string;
  amount: number;
  date?: string;
  place: string | null;
  description: string | null;
};

type RecordCreateRequestDto =
  | RecordCreateTransferRequestDto
  | RecordCreateIncomeRequestDto
  | RecordCreateExpenseRequestDto;

export { type RecordCreateRequestDto };
