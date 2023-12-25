import { navigate, notify } from '~/slices/app/actions.js';
import { actions } from '~/slices/app/app.slice.js';

const allActions = {
  ...actions,
  navigate,
  notify,
};

export { allActions as actions };
export { reducer } from './app.slice.js';
