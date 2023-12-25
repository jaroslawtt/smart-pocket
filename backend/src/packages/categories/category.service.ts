import { CategoryRepository } from '~/packages/categories/category.repository.js';
import { type CategoryGetAllResponseDto } from '~/packages/categories/libs/types/types.js';

class CategoryService {
  private readonly categoryRepository: CategoryRepository;
  public constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async findByUserId(userId: string): Promise<CategoryGetAllResponseDto> {
    const categories = await this.categoryRepository.findByUserId(userId);

    return {
      items: categories.map((category) => category.toObject()),
    };
  }
}

export { CategoryService };
