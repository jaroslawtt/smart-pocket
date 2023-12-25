import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import { RecordTypeValue } from '~/packages/records/libs/enums/enum.js';

const recordsToCategoriesExpenses = (
  records: RecordGetAllItemResponseDto[],
): { data: Array<number>; labels: Array<string> } => [
    ...records
        .filter((record) => record.type === RecordTypeValue.EXPENSE)
        .reduce((accumulator, record) => {
            const recordCategoryName = record.subcategory?.name
                ? record.subcategory.name
                : 'Unknown';
            const recordsList = accumulator.get(recordCategoryName);

            if (!recordsList) accumulator.set(recordCategoryName, [record]);
            else recordsList.push(record);

            return accumulator;
        }, new Map<string, RecordGetAllItemResponseDto[]>()),
].reduce(
    (accumulator, [key, value]) => {
        accumulator.labels.push(key);
        accumulator.data.push(
            value.reduce((prevValue, currValue) => prevValue + currValue.amount, 0),
        );
        return accumulator;
    },
    {
        data: [],
        labels: [],
    } as { data: Array<number>; labels: Array<string> },
);

export { recordsToCategoriesExpenses };
