import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import styles from './styles.module.scss';
import { RecordType } from 'shared/build/packages/records/libs/enums/record-type.enum.js';
import { GraphBar } from '~/pages/dashboard/components/graphs-details/components/cash-flow-graph/components/components';

type Properties = {
  records: RecordGetAllItemResponseDto[];
};
const CashFlowGraph: React.FC<Properties> = ({ records }: Properties) => {
  const totalIncome = records
    .filter((record) => record.type === RecordType.INCOME)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0,
    );
  const totalExpense = records
    .filter((record) => record.type === RecordType.EXPENSE)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0,
    );

  const totalAmount = totalExpense + totalIncome;
  const totalDiff = totalIncome - totalExpense;

  const { expenseProgress, incomeProgress } = {
    expenseProgress:
      totalIncome === totalExpense ? 100 : (100 * totalIncome) / totalAmount,
    incomeProgress:
      totalExpense === totalIncome ? 100 : (100 * totalExpense) / totalAmount,
  };

  return (
    <div className={styles['graph-wrapper']}>
        <div className={styles['details']}>
            <span className={styles['detail-caption']}>Total amount</span>
            <span className={styles['detail-value']}>{totalDiff} UAH</span>
        </div>
      <GraphBar
        type={RecordType.INCOME}
        value={totalIncome}
        progress={expenseProgress}
      />
      <GraphBar
        type={RecordType.EXPENSE}
        value={totalExpense}
        progress={incomeProgress}
      />
    </div>
  );
};

export { CashFlowGraph };
