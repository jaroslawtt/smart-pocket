import { SubcategoryRepository } from '~/packages/subcategories/subcategory.repository.js';
import { SubcategoryModel } from '~/packages/subcategories/subcategory.model.js';
import { SubcategoryService } from '~/packages/subcategories/subcategory.service.js';
import { SubcategoryController } from '~/packages/subcategories/subcategory.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';

export { SubcategoryEntity } from './subcategory.entity.js';

const subcategoryRepository = new SubcategoryRepository(SubcategoryModel);
const subcategoryService = new SubcategoryService(subcategoryRepository);
const subcategoryController = new SubcategoryController(
  logger,
  subcategoryService,
);

export { subcategoryController, subcategoryService };
