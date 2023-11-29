import { IService } from '~/libs/interfaces/service.interface.js';
import { SubcategoryRepository } from '~/packages/subcategories/subcategory.repository.js';
import {
  type SubcategoryCreateDto,
  type SubcategoryGetAllItemResponseDto,
  type SubcategoryUpdateDto,
} from '~/packages/subcategories/libs/types/types.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategories.js';

class SubcategoryService implements Omit<IService, 'findAll' | 'findByUserId'> {
  private readonly subcategoryRepository: SubcategoryRepository;
  public constructor(subcategoryRepository: SubcategoryRepository) {
    this.subcategoryRepository = subcategoryRepository;
  }

  async create(
    payload: SubcategoryCreateDto,
  ): Promise<SubcategoryGetAllItemResponseDto> {
    const { name, categoryId, userId } = payload;

    const subcategory = await this.subcategoryRepository.create(
      SubcategoryEntity.initializeNew({
        name,
        categoryId,
        userId,
      }),
    );

    return subcategory.toObject();
  }

  async delete(id: number): Promise<void> {
    return void this.subcategoryRepository.delete(id);
  }

  async find(id: number): Promise<unknown> {
    const subcategory = await this.subcategoryRepository.find(id);

    if (!subcategory) return null;

    return subcategory.toObject();
  }

  async update(
    payload: SubcategoryUpdateDto,
  ): Promise<SubcategoryGetAllItemResponseDto> {
    const { id, name, categoryId, userId } = payload;
    const subcategory = await this.subcategoryRepository.update(
      SubcategoryEntity.initialize({
        id,
        name,
        categoryId,
        userId,
      }),
    );

    return subcategory.toObject();
  }
}

export { SubcategoryService };
