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
import { AccountRepository } from '~/packages/accounts/account.repository.js';
import { AccountEntity } from '~/packages/accounts/account.entity.js';

class RecordService implements Omit<IService, 'findAll' | 'update'> {
  private readonly recordRepository: RecordRepository;
  private readonly accountRepository: AccountRepository;
  constructor(
    recordRepository: RecordRepository,
    accountRepository: AccountRepository,
  ) {
    this.recordRepository = recordRepository;
    this.accountRepository = accountRepository;
  }
  async create(payload: RecordCreateRequestDto): Promise<unknown> {
    const { type, amount, place, description, date } = payload;
    const account = (
      (await this.accountRepository.find(payload.accountId)) as AccountEntity
    ).toObject();

    switch (type) {
      case RecordTypeValue.TRANSFER:
        await this.accountRepository.transferMoney({
          amount,
          toAccountId: payload.toAccountId,
          fromAccountId: payload.accountId,
        });
        break;
      case RecordTypeValue.EXPENSE:
        await this.accountRepository.produceExpense({
          amount,
          accountId: payload.accountId,
        });
        break;
      case RecordTypeValue.INCOME:
        await this.accountRepository.produceIncome({
          amount,
          accountId: payload.accountId,
        });
        break;
    }

    const record = await this.recordRepository.create(
      RecordEntity.initializeNew({
        type,
        amount,
        remnant:
          type === RecordTypeValue.INCOME
            ? +(account.amount + amount).toFixed(2)
            : +(account.amount - amount).toFixed(2),
        place,
        description,
        payee: payload.type === RecordTypeValue.EXPENSE ? payload.payee : null,
        subcategoryId:
          payload.type !== RecordTypeValue.TRANSFER
            ? payload?.categoryId
              ? payload.categoryId
              : null
            : null,
        toAccountId:
          payload.type === RecordTypeValue.TRANSFER
            ? payload.toAccountId
            : null,
        accountId: payload.accountId,
      }),
    );

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
        await this.accountRepository.transferMoney({
          amount: record.amount,
          toAccountId: record.accountId,
          fromAccountId: record.toAccountId,
        });
        break;
      case RecordTypeValue.EXPENSE:
        await this.accountRepository.produceIncome({
          amount: record.amount,
          accountId: record.accountId,
        });
        break;
      case RecordTypeValue.INCOME:
        await this.accountRepository.produceExpense({
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

  async findByAccountId(accountId: string): Promise<RecordGetAllResponseDto> {
    const records = await this.recordRepository.findByAccountId(accountId);

    return {
      items: records.map(
        (record) => record.toObject() as RecordGetAllItemResponseDto,
      ),
    };
  }
}

export { RecordService };
