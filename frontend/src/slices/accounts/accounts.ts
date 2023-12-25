import { actions } from '~/slices/accounts/accounts.slice.js';
import {
  createAccount,
  getUserAccounts,
  updateAccount,
  deleteAccount,
  getAccountById,
} from '~/slices/accounts/actions.js';

const allActions = {
  ...actions,
  getUserAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountById,
};

export { allActions as actions };
export { reducer } from './accounts.slice.js';
