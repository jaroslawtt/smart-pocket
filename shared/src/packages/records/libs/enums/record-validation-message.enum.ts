const RecordValidationMessage = {
  TYPE_REQUIRE: 'Record types is required',
  AMOUNT_REQUIRE: 'Record amount is required',
  DATE_REQUIRE: 'Record date is required',
  PLACE_REQUIRE: 'Record place is required',
  DESCRIPTION_REQUIRE: 'Record description is required',
  ACCOUNT_ID_REQUIRE: 'Record account ID is required',
  CATEGORY_ID_NOT_ZERO: 'Record category ID must be 0 or greater',
  FROM_ACCOUNT_ID_REQUIRE: 'Record from account ID is required',
  TO_ACCOUNT_ID_REQUIRE: 'Record to account ID is required',
} as const;

export { RecordValidationMessage };
