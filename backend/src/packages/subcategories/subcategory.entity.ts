import { IEntity } from '~/libs/interfaces/entity.interface.js';

class SubcategoryEntity implements IEntity {
  private readonly id: number | null;

  private readonly name: string;

  private readonly categoryId: number;

  private readonly userId: string | null;

  private constructor({
    id,
    name,
    categoryId,
    userId,
  }: {
    id: number | null;
    name: string;
    categoryId: number;
    userId: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.userId = userId;
  }

  public static initialize({
    id,
    name,
    categoryId,
    userId,
  }: {
    id: number;
    name: string;
    categoryId: number;
    userId: string | null;
  }): SubcategoryEntity {
    return new SubcategoryEntity({
      id,
      name,
      categoryId,
      userId,
    });
  }

  public static initializeNew({
    name,
    categoryId,
    userId,
  }: {
    name: string;
    categoryId: number;
    userId: string | null;
  }): SubcategoryEntity {
    return new SubcategoryEntity({
      id: null,
      name,
      categoryId,
      userId,
    });
  }

  public toNewObject(): {
    name: string;
    categoryId: number;
    userId: string | null;
  } {
    return {
      name: this.name,
      categoryId: this.categoryId,
      userId: this.userId,
    };
  }

  public toObject(): {
    id: number;
    name: string;
    categoryId: number;
    userId: string | null;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      categoryId: this.categoryId as number,
      userId: this.userId as string | null,
    };
  }
}

export { SubcategoryEntity };
