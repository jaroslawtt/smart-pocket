import {
  getCurrentUser,
  signIn,
  signUp,
  signOut,
} from '~/slices/auth/actions.js';
import { actions } from '~/slices/auth/auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signIn,
  getCurrentUser,
  signOut,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
