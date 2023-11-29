import { actions } from '~/slices/accounts/accounts.slice.js';
import {
  createAccount,
  getUserAccounts,
  updateAccount,
  deleteAccount,
} from '~/slices/accounts/actions.js';

const allActions = {
  ...actions,
  getUserAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};

export { allActions as actions };
export { reducer } from './accounts.slice.js';
