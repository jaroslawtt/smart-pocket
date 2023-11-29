import { IRepository } from '~/libs/interfaces/repository.interface.js';
import { SubcategoryModel } from '~/packages/subcategories/subcategory.model.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class SubcategoryRepository
  implements Omit<IRepository, 'findByUserId' | 'findAll'>
{
  private readonly subcategoryModel: typeof SubcategoryModel;
  public constructor(subcategoryModel: typeof SubcategoryModel) {
    this.subcategoryModel = subcategoryModel;
  }

  async create(payload: SubcategoryEntity): Promise<SubcategoryEntity> {
    const { name } = payload.toNewObject();
    const subcategory = await this.subcategoryModel
      .query()
      .insert({ name })
      .execute();
    return SubcategoryEntity.initialize({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      userId: subcategory.userId,
    });
  }

  async delete(id: number): Promise<void> {
    return void this.subcategoryModel.query().deleteById(id);
  }

  async find(id: number): Promise<SubcategoryEntity | null> {
    const subcategory = await this.subcategoryModel
      .query()
      .findById(id)
      .execute();

    if (!subcategory) return null;

    return SubcategoryEntity.initialize({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      userId: subcategory.userId,
    });
  }

  async update(payload: SubcategoryEntity): Promise<SubcategoryEntity> {
    const { id, name, userId, categoryId } = payload.toObject();

    const subcategory = await this.subcategoryModel
      .query()
      .patchAndFetchById(id, { name, userId, categoryId });

    return SubcategoryEntity.initialize({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      userId: subcategory.userId,
    });
  }
}

export { SubcategoryRepository };
