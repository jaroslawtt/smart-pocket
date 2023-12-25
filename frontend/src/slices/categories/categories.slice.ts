import { createSlice } from '@reduxjs/toolkit';
import { DataStatus, SliceName } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';
import { type CategoryGetAllItemResponseDto } from '~/packages/categories/libs/types/types.js';
import { getAllUserCategories } from '~/slices/categories/actions';

type State = {
  status: ValueOf<typeof DataStatus>;
  categories: CategoryGetAllItemResponseDto[] | null;
};

const initialState: State = {
  status: DataStatus.IDLE,
  categories: null,
};

const { reducer, actions } = createSlice({
  name: SliceName.CATEGORIES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserCategories.pending, (state) => {
      state.status = DataStatus.PENDING;
    });
    builder.addCase(getAllUserCategories.fulfilled, (state, { payload }) => {
      state.status = DataStatus.FULFILLED;
      state.categories = payload.items;
    });
  },
});

export { reducer, actions };
