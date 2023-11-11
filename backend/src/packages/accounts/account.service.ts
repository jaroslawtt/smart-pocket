import { IService } from '~/libs/interfaces/service.interface.js';
import {
  type AccountCreateRequestDto,
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

  async find(payload: string): Promise<AccountGetAllItemResponseDto | null> {
    const account = await this.accountRepository.find(payload);

    if (!account) {
      return null;
    }

    return account.toMappedObject();
  }

  async findByUserId(userId: string): Promise<AccountGetAllResponseDto> {
    const accounts = await this.accountRepository.findByUserId(userId);

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
}

export { AccountService };
