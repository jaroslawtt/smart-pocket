import { createAsyncThunk } from '@reduxjs/toolkit';
import { type CategoryGetAllResponseDto } from '~/packages/categories/libs/types/types.js';
import { AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { SliceName } from '~/libs/enums/enums.js';

const getAllUserCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${SliceName.CATEGORIES}/get-all-categories`, async (_, { extra }) => {
  const { categoriesApi } = extra;

  const categories = await categoriesApi.getAllCategories();

  return categories;
});

export { getAllUserCategories };