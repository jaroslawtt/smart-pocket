import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import styles from './styles.module.scss';
import { RecordType } from 'shared/build/packages/records/libs/enums/record-type.enum';
import { getValidClassNames } from '~/libs/helpers/helpers';

type Properties = {
  record: RecordGetAllItemResponseDto;
};
const RecordCard: React.FC<Properties> = ({ record }: Properties) => {
  return (
    <div className={styles['card-wrapper']}>
      <div className={styles['card-details']}>
        <span className={styles['card-category']}>
          {record.subcategory?.name ?? 'Unknown'}
        </span>
        <div className={styles['card-type-wrapper']}>
          <div className={styles['circle']}></div>
          <span className={styles['card-type']}>Cash</span>
        </div>
      </div>
      <div className={styles['card-details-right']}>
        <span
          className={getValidClassNames(
            styles['card-amount'],
            record.type === RecordType.INCOME ? styles['green'] : styles['red'],
          )}
        >
          {record.type === RecordType.INCOME
            ? `+${record.amount} UAH`
            : `-${record.amount} UAH`}
        </span>
        <span className={styles['card-date']}>
          {new Date(record.date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export { RecordCard };
