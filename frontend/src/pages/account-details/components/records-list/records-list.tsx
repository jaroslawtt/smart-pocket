import {
  type RecordGetAllItemResponseDto,
} from '~/packages/records/libs/types/types.js';
import styles from './styles.module.scss';
import {
  RecordCard,
} from '~/pages/account-details/components/records-list/components/components.js';

type Properties = {
  date: string;
  records: RecordGetAllItemResponseDto[];
};

const RecordsList: React.FC<Properties> = ({
  date,
  records,
}: Properties) => {
  return (
    <div className={styles['records-list-wrapper']}>
      <span className={styles['record-list-date']}>{date}</span>
      <ul className={styles['records-list']}>
        {records.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </ul>
    </div>
  );
};

export { RecordsList };
