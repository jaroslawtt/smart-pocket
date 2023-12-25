import { RecordTypeValue } from '~/packages/records/libs/enums/enum.js';
import { RecordTypeValueToReadable } from '~/pages/account-details/components/records-list/components/create-record-form/libs/record-type-value-to-readable-map';

const DEFAULT_CREATE_RECORD_PAYLOAD = {
  type: RecordTypeValue.EXPENSE,
  amount: 0,
};

const RECORD_TYPE_OPTIONS = Object.values(RecordTypeValue).map((value) => ({
  label: RecordTypeValueToReadable[value],
  value,
}));

export { DEFAULT_CREATE_RECORD_PAYLOAD, RECORD_TYPE_OPTIONS };
