import { createSlice } from '@reduxjs/toolkit';
import { AppRoute, SliceName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { navigate } from '~/slices/app/actions.js';

type State = {
  navigateTo: null | ValueOf<typeof AppRoute>;
};

const initialState: State = {
  navigateTo: null,
};

const { actions, reducer } = createSlice({
  initialState,
  name: SliceName.APP,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(navigate, (state, { payload }) => {
      state.navigateTo = payload;
    });
  },
});

export { actions, reducer };
