import { actions } from './records.slice.js';
import {
  getAccountRecords,
  deleteRecord,
  createRecord,
  getAllRecords,
} from '~/slices/records/actions.js';

const allActions = {
  ...actions,
  getAccountRecords,
  deleteRecord,
  createRecord,
  getAllRecords,
};
export { reducer } from './records.slice.js';
export { allActions as actions };
