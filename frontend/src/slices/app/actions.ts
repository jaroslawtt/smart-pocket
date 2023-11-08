import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { sliceName } from '~/slices/app/app.slice.js';

const navigate = createAction<ValueOf<typeof AppRoute> | null>(`${sliceName}`);

export { navigate };
