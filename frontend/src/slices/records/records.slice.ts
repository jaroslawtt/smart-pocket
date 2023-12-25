import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '~/libs/enums/enums.js';
import {
  createRecord,
  deleteRecord,
  getAccountRecords, getAllRecords,
} from '~/slices/records/actions.js';

type InitialState = {
  dataStatus: ValueOf<typeof DataStatus>;
  records: RecordGetAllItemResponseDto[] | null;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
  records: null,
};

const { actions, reducer } = createSlice({
  initialState,
  name: SliceName.RECORDS,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountRecords.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAccountRecords.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.records = payload ? payload.items : payload;
    });
    builder.addCase(getAllRecords.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllRecords.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.records = payload ? payload.items : payload;
    });
    builder.addCase(deleteRecord.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteRecord.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.records =
        state.records &&
        state.records.filter((record) => record.id !== payload);
    });
    builder.addCase(createRecord.fulfilled, (state, { payload }) => {
      state.records = state.records ? [...state.records, payload] : [payload];
    });
  },
});

export { actions, reducer };
