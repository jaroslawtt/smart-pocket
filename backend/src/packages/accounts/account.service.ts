import { IService } from '~/libs/interfaces/service.interface.js';
import {
  type AccountCreateRequestDto,
  type AccountFilterQueryDto,
  type AccountGetAllItemResponseDto,
  type AccountUpdateRequestDto,
} from '~/packages/accounts/libs/types/types.js';
import { AccountRepository } from '~/packages/accounts/account.repository.js';
import { AccountEntity } from '~/packages/accounts/account.entity.js';
import { type AccountGetAllResponseDto } from '~/packages/accounts/libs/types/types.js';

class AccountService implements Omit<IService, 'findAll'> {
  private readonly accountRepository: AccountRepository;
  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }
  public async create({
    userId,
    payload,
  }: {
    userId: string;
    payload: AccountCreateRequestDto;
  }): Promise<AccountGetAllItemResponseDto> {
    const account = await this.accountRepository.create(
      AccountEntity.initializeNew({
        userId,
        ...payload,
      }),
    );

    return account.toMappedObject();
  }

  async delete(payload: string): Promise<void> {
    return void this.accountRepository.delete(payload);
  }

  async find(id: string) {
    const account = await this.accountRepository.find(id);

    if (!account) {
      return null;
    }

    return account.toObject();
  }

  async findByUserId(userId: string, parameters: AccountFilterQueryDto): Promise<AccountGetAllResponseDto> {
    const accounts = await this.accountRepository.findByUserId(userId, parameters);

    return {
      items: accounts.map((account) => account.toMappedObject()),
    };
  }

  async update({
    id,
    userId,
    payload,
  }: {
    id: string;
    userId: string;
    payload: AccountUpdateRequestDto;
  }): Promise<AccountGetAllItemResponseDto> {
    const account = await this.accountRepository.update(
      AccountEntity.initialize({
        id,
        userId,
        ...payload,
      }),
    );

    return account.toMappedObject();
  }

  async produceIncome({
    amount,
    accountId,
  }: {
    accountId: string;
    amount: number;
  }): Promise<void> {
    return void this.accountRepository.produceIncome({ amount, accountId });
  }

  async produceExpense({
    amount,
    accountId,
  }: {
    accountId: string;
    amount: number;
  }): Promise<void> {
    return void this.accountRepository.produceExpense({ amount, accountId });
  }

  async transferMoney({
    amount,
    toAccountId,
    fromAccountId,
  }: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
  }): Promise<void> {
    return this.accountRepository.transferMoney({
      amount,
      toAccountId,
      fromAccountId,
    });
  }
}

export { AccountService };
