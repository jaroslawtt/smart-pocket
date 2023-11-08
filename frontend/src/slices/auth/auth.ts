import { getCurrentUser, signIn, signUp } from '~/slices/auth/actions.js';

const allActions = {
  signUp,
  signIn,
  getCurrentUser,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
