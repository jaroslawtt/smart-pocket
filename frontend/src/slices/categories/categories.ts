import { getAllUserCategories } from './actions.js';
import { actions } from '~/slices/categories/categories.slice.js';

const allActions = {
  ...actions,
  getAllUserCategories,
};

export { allActions as actions };
export { reducer } from './categories.slice.js';
