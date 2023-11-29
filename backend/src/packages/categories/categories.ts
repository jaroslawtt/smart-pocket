import { CategoryRepository } from '~/packages/categories/category.repository.js';
import { CategoryModel } from './category.model.js';
import { CategoryService } from '~/packages/categories/category.service.js';
import { CategoryController } from '~/packages/categories/category.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';

export { CategoryValue } from './libs/enums/enums.js';

const categoryRepository = new CategoryRepository(CategoryModel);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(logger, categoryService);

export { categoryController };
