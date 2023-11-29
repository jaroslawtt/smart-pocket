import { createAction } from '@reduxjs/toolkit';
import { AppRoute, SliceName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const sliceName = SliceName.APP;
const navigate = createAction<ValueOf<typeof AppRoute> | null>(`${sliceName}`);

export { navigate };
