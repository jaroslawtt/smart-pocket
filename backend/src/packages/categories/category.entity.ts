import { IEntity } from '~/libs/interfaces/entity.interface.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';
import { type SubcategoryGetAllItemResponseDto } from '~/packages/subcategories/libs/types/types.js';

class CategoryEntity implements IEntity {
  private readonly id: number | null;

  private readonly name: string;

  private readonly subcategories: Array<SubcategoryEntity> | null;

  private constructor({
    id,
    name,
    subcategories,
  }: {
    id: number | null;
    name: string;
    subcategories: Array<SubcategoryEntity> | null;
  }) {
    this.id = id;
    this.name = name;
    this.subcategories = subcategories;
  }

  public static initialize({
    id,
    name,
    subcategories,
  }: {
    id: number;
    name: string;
    subcategories: Array<SubcategoryEntity> | null;
  }): CategoryEntity {
    return new CategoryEntity({
      id,
      name,
      subcategories,
    });
  }

  public static initializeNew({ name }: { name: string }): CategoryEntity {
    return new CategoryEntity({
      id: null,
      name,
      subcategories: null,
    });
  }

  public toNewObject(): {
    name: string;
    subcategories: Array<SubcategoryEntity> | null;
  } {
    return {
      name: this.name,
      subcategories: this.subcategories,
    };
  }

  public toObject(): {
    id: number;
    name: string;
    subcategories: Array<SubcategoryGetAllItemResponseDto>;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      subcategories: (this.subcategories as Array<SubcategoryEntity>).map(
        (subcategory) => subcategory.toObject(),
      ),
    };
  }
}

export { CategoryEntity };
