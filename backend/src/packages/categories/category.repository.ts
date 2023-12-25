import { CategoryModel } from '~/packages/categories/category.model.js';
import { CategoryEntity } from '~/packages/categories/category.entity.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class CategoryRepository {
  private readonly defaultRelationExpression = 'subcategories';
  private readonly categoryModel: typeof CategoryModel;
  public constructor(categoryModel: typeof CategoryModel) {
    this.categoryModel = categoryModel;
  }

  async findByUserId(userId: string): Promise<CategoryEntity[]> {
    const categories = await this.categoryModel
      .query()
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph(this.defaultRelationExpression, (builder) =>
        builder.whereNull('user_id').orWhere('user_id', userId),
      )
      .execute();

    return categories.map((category) =>
      CategoryEntity.initialize({
        id: category.id,
        name: category.name,
        subcategories: category.subcategories.map((subcategory) =>
          SubcategoryEntity.initialize({
            id: subcategory.id,
            name: subcategory.name,
            categoryId: subcategory.categoryId,
            userId: subcategory.userId,
          }),
        ),
      }),
    );
  }
}

export { CategoryRepository };
