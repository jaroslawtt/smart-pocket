import { createSlice } from '@reduxjs/toolkit';
import { AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { navigate } from '~/slices/app/actions.js';

type State = {
  navigateTo: null | ValueOf<typeof AppRoute>;
};

const initialState: State = {
  navigateTo: null,
};

const { actions, name, reducer } = createSlice({
  initialState,
  name: 'app',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(navigate, (state, { payload }) => {
      state.navigateTo = payload;
    });
  },
});

export { name as sliceName, actions, reducer };
