import { type CategoryGetAllItemResponseDto } from '~/packages/categories/libs/types/category-get-all-item-response-dto.type.js';
import { type RecordExpense } from '~/packages/records/libs/types/record-expense.type.js';
import { type RecordIncome } from '~/packages/records/libs/types/record-income.type.js';
import { type RecordTransfer } from '~/packages/records/libs/types/record-transfer.type.js';

type RecordExpenseGetAllItemResponseDto = RecordTypeGetAllItemResponseDto &
  RecordExpense;

type RecordIncomeGetAllItemResponseDto = RecordTypeGetAllItemResponseDto &
  RecordIncome;

type RecordTransferGetAllItemResponseDto = RecordTypeGetAllItemResponseDto &
  RecordTransfer;

type RecordTypeGetAllItemResponseDto = {
  id: string;
  amount: number;
  date: string;
  place: string | null;
  description: string | null;
  subcategory: CategoryGetAllItemResponseDto | null;
};

type RecordGetAllItemResponseDto =
  | RecordExpenseGetAllItemResponseDto
  | RecordIncomeGetAllItemResponseDto
  | RecordTransferGetAllItemResponseDto;

export { type RecordGetAllItemResponseDto };
