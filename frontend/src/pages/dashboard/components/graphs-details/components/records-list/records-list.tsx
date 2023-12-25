import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import styles from './styles.module.scss';
import { RecordCard } from '~/pages/dashboard/components/graphs-details/components/records-list/components/record-card/record-card';

type Properties = {
  records: RecordGetAllItemResponseDto[];
};
const RecordsList: React.FC<Properties> = ({ records }: Properties) => {
  return (
    <div className={styles['list-wrapper']}>
      {[...records]
        .sort(
          (record1, record2) =>
            new Date(record1.date).getTime() - new Date(record2.date).getTime(),
        )
        .reverse()
        .map((record) => (
          <RecordCard record={record} />
        ))}
    </div>
  );
};

export { RecordsList };
