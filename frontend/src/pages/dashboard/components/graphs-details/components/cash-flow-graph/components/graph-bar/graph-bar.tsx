import styles from './styles.module.scss';
import { type ValueOf } from '~/libs/types/types';
import { RecordTypeValue } from '~/packages/records/libs/enums/enum';
import { getValidClassNames } from '~/libs/helpers/helpers';

type Properties = {
  type: ValueOf<typeof RecordTypeValue>;
  value: number;
  progress: number;
};
const GraphBar: React.FC<Properties> = ({ type, progress, value }: Properties) => {
  return (
    <div className={styles['bar-wrapper']}>
      <div className={styles['bar-details']}>
          <span className={styles['']}>{type}</span>
          <span className={styles['detail-amount']}>UAH {value}</span>
      </div>
      <div className={getValidClassNames(styles['bar'])}>
        <div
          style={{
            width: `${progress}%`,
          }}
          className={getValidClassNames(
            styles['progress'],
            type === RecordTypeValue.EXPENSE ? styles['red'] : styles['green'],
          )}
        ></div>
      </div>
    </div>
  );
};

export { GraphBar };
