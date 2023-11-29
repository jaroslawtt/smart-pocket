import { IService } from '~/libs/interfaces/service.interface.js';
import {
  type RecordCreateRequestDto,
  type RecordGetAllItemResponseDto,
  type RecordGetAllResponseDto,
  type RecordUpdateRequestDto,
} from '~/packages/records/libs/types/types.js';
import { RecordRepository } from '~/packages/records/record.repository.js';
import { RecordEntity } from '~/packages/records/record.entity.js';
import { RecordTypeValue } from '~/packages/records/records.js';
import { AccountService } from '~/packages/accounts/account.service.js';

class RecordService implements Omit<IService, 'findAll'> {
  private readonly recordRepository: RecordRepository;
  private readonly accountService: AccountService;
  constructor(
    recordRepository: RecordRepository,
    accountService: AccountService,
  ) {
    this.recordRepository = recordRepository;
    this.accountService = accountService;
  }
  async create(payload: RecordCreateRequestDto): Promise<unknown> {
    const { type, amount, place, description, date } = payload;
    const record = await this.recordRepository.create(
      RecordEntity.initializeNew({
        type,
        amount,
        place,
        description,
        date,
        payee: payload.type === RecordTypeValue.EXPENSE ? payload.payee : null,
        subcategoryId:
          payload.type !== RecordTypeValue.TRANSFER ? payload.categoryId : null,
        toAccountId:
          payload.type === RecordTypeValue.TRANSFER
            ? payload.toAccountId
            : null,
        fromAccountId:
          payload.type === RecordTypeValue.TRANSFER
            ? payload.fromAccountId
            : null,
        accountId:
          payload.type !== RecordTypeValue.TRANSFER ? payload.accountId : null,
      }),
    );

    switch (type) {
      case RecordTypeValue.TRANSFER:
        await this.accountService.transferMoney({
          amount,
          toAccountId: payload.toAccountId,
          fromAccountId: payload.fromAccountId,
        });
        break;
      case RecordTypeValue.EXPENSE:
        await this.accountService.produceExpense({
          amount,
          accountId: payload.accountId,
        });
        break;
      case RecordTypeValue.INCOME:
        await this.accountService.produceIncome({
          amount,
          accountId: payload.accountId,
        });
        break;
    }

    return record.toObject();
  }

  async delete(id: string): Promise<void> {
    const record =
      ((
        await this.recordRepository.find(id)
      )?.toObject() as RecordGetAllItemResponseDto) ?? null;

    if (!record) return;

    switch (record.type) {
      case RecordTypeValue.TRANSFER:
        await this.accountService.transferMoney({
          amount: record.amount,
          toAccountId: record.fromAccountId,
          fromAccountId: record.toAccountId,
        });
        break;
      case RecordTypeValue.EXPENSE:
        await this.accountService.produceIncome({
          amount: record.amount,
          accountId: record.accountId,
        });
        break;
      case RecordTypeValue.INCOME:
        await this.accountService.produceExpense({
          amount: record.amount,
          accountId: record.accountId,
        });
        break;
    }

    return void this.recordRepository.delete(record.id);
  }

  async find(id: string) {
    const record = await this.recordRepository.find(id);

    if (!record) return null;

    return record.toObject();
  }

  async findByUserId(userId: string): Promise<RecordGetAllResponseDto> {
    const records = await this.recordRepository.findByUserId(userId);

    return {
      items: records.map(
        (record) => record.toObject() as RecordGetAllItemResponseDto,
      ),
    };
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: RecordUpdateRequestDto;
  }) {
    const { type, amount, place, description, date } = payload;
    const record = await this.recordRepository.update(
      RecordEntity.initialize({
        id,
        type,
        amount,
        place,
        description,
        date,
        payee: payload.type === RecordTypeValue.EXPENSE ? payload.payee : null,
        subcategoryId:
          payload.type !== RecordTypeValue.TRANSFER ? payload.categoryId : null,
        toAccountId:
          payload.type === RecordTypeValue.TRANSFER
            ? payload.toAccountId
            : null,
        fromAccountId:
          payload.type === RecordTypeValue.TRANSFER
            ? payload.fromAccountId
            : null,
        accountId:
          payload.type !== RecordTypeValue.TRANSFER ? payload.accountId : null,
        subcategory: null,
      }),
    );

    return record.toObject();
  }
}

export { RecordService };
