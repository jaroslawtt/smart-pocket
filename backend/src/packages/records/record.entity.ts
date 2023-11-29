import { IEntity } from '~/libs/interfaces/entity.interface.js';
import { ValueOf } from '~/libs/types/types.js';
import { RecordTypeValue } from './records.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class RecordEntity implements IEntity {
  private readonly id: string | null;

  private readonly type: ValueOf<typeof RecordTypeValue>;

  private readonly accountId: string | null;

  private readonly fromAccountId: string | null;

  private readonly toAccountId: string | null;

  private readonly subcategoryId: number | null;

  private readonly amount: number;

  private readonly date: string;

  private readonly payee: string | null;

  private readonly place: string | null;

  private readonly description: string | null;

  private readonly subcategory: SubcategoryEntity | null;

  private constructor({
    id,
    type,
    accountId,
    fromAccountId,
    toAccountId,
    subcategoryId,
    amount,
    date,
    payee,
    place,
    description,
    subcategory,
  }: {
    id: string | null;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string | null;
    fromAccountId: string | null;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
  }) {
    this.id = id;
    this.type = type;
    this.accountId = accountId;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.subcategoryId = subcategoryId;
    this.amount = amount;
    this.payee = payee;
    this.place = place;
    this.date = date;
    this.description = description;
    this.subcategory = subcategory;
  }

  public static initialize({
    id,
    type,
    accountId,
    fromAccountId,
    toAccountId,
    subcategoryId,
    amount,
    date,
    payee,
    place,
    description,
    subcategory,
  }: {
    id: string;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string | null;
    fromAccountId: string | null;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
  }): RecordEntity {
    return new RecordEntity({
      id,
      type,
      accountId,
      fromAccountId,
      toAccountId,
      subcategoryId,
      amount,
      date,
      payee,
      place,
      description,
      subcategory,
    });
  }

  public static initializeNew({
    type,
    accountId,
    fromAccountId,
    toAccountId,
    subcategoryId,
    amount,
    date,
    payee,
    place,
    description,
  }: {
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string | null;
    fromAccountId: string | null;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
  }): RecordEntity {
    return new RecordEntity({
      id: null,
      type,
      accountId,
      fromAccountId,
      toAccountId,
      subcategoryId,
      amount,
      payee,
      place,
      description,
      date,
      subcategory: null,
    });
  }
  public toObject(): {
    id: string;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string | null;
    fromAccountId: string | null;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
  } {
    return {
      id: this.id as string,
      type: this.type as ValueOf<typeof RecordTypeValue>,
      accountId: this.accountId as string | null,
      fromAccountId: this.fromAccountId as string | null,
      toAccountId: this.toAccountId as string | null,
      subcategoryId: this.subcategoryId as number | null,
      amount: this.amount as number,
      date: this.date as string,
      payee: this.payee as string | null,
      place: this.place as string | null,
      description: this.description as string | null,
      subcategory: this.subcategory as SubcategoryEntity | null,
    };
  }

  public toNewObject(): {
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string | null;
    fromAccountId: string | null;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
  } {
    return {
      type: this.type as ValueOf<typeof RecordTypeValue>,
      accountId: this.accountId as string | null,
      fromAccountId: this.fromAccountId as string | null,
      toAccountId: this.toAccountId as string | null,
      subcategoryId: this.subcategoryId as number | null,
      amount: this.amount as number,
      date: this.date as string,
      payee: this.payee as string | null,
      place: this.place as string | null,
      description: this.description as string | null,
    };
  }
}

export { RecordEntity };
