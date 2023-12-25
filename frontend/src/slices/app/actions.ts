import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute, SliceName } from '~/libs/enums/enums.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';
import { NotificationType } from '~/libs/packages/notification/libs/enums/enums';

const sliceName = SliceName.APP;
const navigate = createAction<ValueOf<typeof AppRoute> | null>(`${sliceName}`);

const notify = createAsyncThunk<
  unknown,
  {
    message: string;
    type: ValueOf<typeof NotificationType>;
  },
  AsyncThunkConfig
>(`${sliceName}/notify`, ({ type, message }, { extra }) => {
  const { notification } = extra;

  notification[type](message);
});

export { navigate, notify };
