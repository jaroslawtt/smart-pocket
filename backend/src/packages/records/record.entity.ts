import { IEntity } from '~/libs/interfaces/entity.interface.js';
import { ValueOf } from '~/libs/types/types.js';
import { RecordTypeValue } from './records.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class RecordEntity implements IEntity {
  private readonly id: string | null;

  private readonly type: ValueOf<typeof RecordTypeValue>;

  private readonly accountId: string;

  private readonly toAccountId: string | null;

  private readonly subcategoryId: number | null;

  private readonly amount: number;

  private readonly remnant: number;

  private readonly date?: string | null;

  private readonly payee: string | null;

  private readonly place: string | null;

  private readonly description: string | null;

  private readonly subcategory: SubcategoryEntity | null;

  private readonly createdAt: string | null;

  private readonly updatedAt: string | null;

  private constructor({
    id,
    type,
    accountId,
    toAccountId,
    subcategoryId,
    amount,
    remnant,
    date,
    payee,
    place,
    description,
    subcategory,
    createdAt,
    updatedAt,
  }: {
    id: string | null;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    remnant: number;
    date: string | null;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
    createdAt: string | null;
    updatedAt: string | null;
  }) {
    this.id = id;
    this.type = type;
    this.accountId = accountId;
    this.toAccountId = toAccountId;
    this.subcategoryId = subcategoryId;
    this.amount = amount;
    this.remnant = remnant;
    this.payee = payee;
    this.place = place;
    this.date = date;
    this.description = description;
    this.subcategory = subcategory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    type,
    accountId,
    toAccountId,
    subcategoryId,
    amount,
    remnant,
    date,
    payee,
    place,
    description,
    subcategory,
    createdAt,
    updatedAt,
  }: {
    id: string;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    remnant: number;
    date: string | null;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
    createdAt: string;
    updatedAt: string;
  }): RecordEntity {
    return new RecordEntity({
      id,
      type,
      accountId,
      toAccountId,
      subcategoryId,
      amount,
      remnant,
      date,
      payee,
      place,
      description,
      subcategory,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    type,
    accountId,
    toAccountId,
    subcategoryId,
    amount,
    remnant,
    payee,
    place,
    description,
  }: {
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    remnant: number;
    payee: string | null;
    place: string | null;
    description: string | null;
  }): RecordEntity {
    return new RecordEntity({
      id: null,
      type,
      accountId,
      toAccountId,
      subcategoryId,
      amount,
      remnant,
      payee,
      place,
      description,
      date: null,
      subcategory: null,
      createdAt: null,
      updatedAt: null,
    });
  }
  public toObject(): {
    id: string;
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    remnant: number;
    date: string;
    payee: string | null;
    place: string | null;
    description: string | null;
    subcategory: SubcategoryEntity | null;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      type: this.type as ValueOf<typeof RecordTypeValue>,
      accountId: this.accountId as string,
      toAccountId: this.toAccountId as string | null,
      subcategoryId: this.subcategoryId as number | null,
      amount: this.amount as number,
      remnant: this.remnant as number,
      date: this.date as string,
      payee: this.payee as string | null,
      place: this.place as string | null,
      description: this.description as string | null,
      subcategory: this.subcategory as SubcategoryEntity | null,
      createdAt: this.createdAt as string,
      updatedAt: this.updatedAt as string,
    };
  }

  public toNewObject(): {
    type: ValueOf<typeof RecordTypeValue>;
    accountId: string;
    toAccountId: string | null;
    subcategoryId: number | null;
    amount: number;
    remnant: number;
    date: string | null;
    payee: string | null;
    place: string | null;
    description: string | null;
  } {
    return {
      type: this.type as ValueOf<typeof RecordTypeValue>,
      accountId: this.accountId as string,
      toAccountId: this.toAccountId as string | null,
      subcategoryId: this.subcategoryId as number | null,
      amount: this.amount as number,
      remnant: this.remnant as number,
      date: this.date as string | null,
      payee: this.payee as string | null,
      place: this.place as string | null,
      description: this.description as string | null,
    };
  }
}

export { RecordEntity };
