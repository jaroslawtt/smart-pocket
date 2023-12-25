import { IEntity } from '~/libs/interfaces/entity.interface';
import { type ValueOf } from '~/libs/types/types.js';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';
import { RecordEntity } from '~/packages/records/record.entity.js';

class AccountEntity implements IEntity {
  private readonly 'id': string | null;

  private readonly 'userId': string | null;

  private readonly 'name': string | null;

  private readonly 'amount': number | null;

  private readonly 'currency': ValueOf<typeof AccountCurrencyValue> | null;

  private readonly 'records': RecordEntity[] | null;

  private constructor({
    id,
    userId,
    name,
    amount,
    currency,
    records,
  }: {
    id: string | null;
    userId: string | null;
    name: string | null;
    amount: number | null;
    currency: ValueOf<typeof AccountCurrencyValue> | null;
    records: RecordEntity[] | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.amount = amount;
    this.currency = currency;
    this.records = records;
  }

  public static initialize({
    id,
    userId,
    name,
    amount,
    currency,
    records,
  }: {
    id: string | null;
    userId: string | null;
    name: string | null;
    amount: number | null;
    currency: ValueOf<typeof AccountCurrencyValue> | null;
    records: RecordEntity[] | null;
  }): AccountEntity {
    return new AccountEntity({
      id,
      userId,
      name,
      amount,
      currency,
      records,
    });
  }

  public static initializeNew({
    userId,
    name,
    amount,
    currency,
  }: {
    userId: string | null;
    name: string | null;
    amount: number | null;
    currency: ValueOf<typeof AccountCurrencyValue> | null;
  }): AccountEntity {
    return new AccountEntity({
      id: null,
      userId,
      name,
      amount,
      currency,
      records: null,
    });
  }

  toNewObject(): {
    userId: string;
    name: string;
    amount: number;
    currency: ValueOf<typeof AccountCurrencyValue>;
  } {
    return {
      userId: this.userId as string,
      name: this.name as string,
      amount: this.amount as number,
      currency: this.currency as ValueOf<typeof AccountCurrencyValue>,
    };
  }

  toObject(): {
    id: string;
    userId: string;
    name: string;
    amount: number;
    currency: ValueOf<typeof AccountCurrencyValue>;
  } {
    return {
      id: this.id as string,
      userId: this.userId as string,
      name: this.name as string,
      amount: this.amount as number,
      currency: this.currency as ValueOf<typeof AccountCurrencyValue>,
    };
  }

  toMappedObject(): {
    id: string;
    name: string;
    amount: number;
    currency: ValueOf<typeof AccountCurrencyValue>;
  } {
    return {
      id: this.id as string,
      name: this.name as string,
      amount: this.amount as number,
      currency: this.currency as ValueOf<typeof AccountCurrencyValue>,
    };
  }

  toRecordsList(): RecordEntity[] {
    return this.records as RecordEntity[];
  }
}

export { AccountEntity };
