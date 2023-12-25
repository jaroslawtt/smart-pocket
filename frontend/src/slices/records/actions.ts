import { SliceName } from '~/libs/enums/enums.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type RecordCreateRequestDto,
  type RecordDeleteRequestParamsDto,
  type RecordGetAllByAccountIdDtoResponse,
  type RecordGetAllItemResponseDto,
  RecordGetAllResponseDto,
} from '~/packages/records/libs/types/types.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';

const sliceName = SliceName.RECORDS;

const getAllRecords = createAsyncThunk<
  RecordGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/-get-all-records`, async (payload, { extra }) => {
  const { recordsApi } = extra;

  const records = await recordsApi.getAllRecords();

  return records;
});

const getAccountRecords = createAsyncThunk<
  RecordGetAllByAccountIdDtoResponse,
  { accountId: string },
  AsyncThunkConfig
>(
  `${sliceName}/get-all-account-records`,
  async ({ accountId: id }, { extra }) => {
    const { accountsApi } = extra;

    const records = await accountsApi.getAccountRecords({ id });

    return records;
  },
);

const createRecord = createAsyncThunk<
  RecordGetAllItemResponseDto,
  RecordCreateRequestDto,
  AsyncThunkConfig
>(`${SliceName.RECORDS}/create-record`, async (payload, { extra }) => {
  const { recordsApi } = extra;

  const record = await recordsApi.createRecord(payload);

  return record;
});

const deleteRecord = createAsyncThunk<
  string,
  RecordDeleteRequestParamsDto,
  AsyncThunkConfig
>(`${sliceName}/delete-record`, async (payload, { extra }) => {
  const { recordsApi } = extra;

  await recordsApi.deleteRecord(payload);

  return payload.id;
});

export { getAccountRecords, createRecord, deleteRecord, getAllRecords };
