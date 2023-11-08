import { type AnyAction, isRejected } from '@reduxjs/toolkit';
import { type store } from '../store.js';

const handleError = () => {
  return (next: typeof store.instance.dispatch) =>
    (action: AnyAction): unknown => {
      const result: unknown = next(action);

      return result;
    };
};

export { handleError };
