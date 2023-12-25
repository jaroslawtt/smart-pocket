import styles from './styles.module.scss';
import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import {
    ExpensesStructureGraphs,
    GraphCard,
    RecordsList,
    CashFlowGraph
} from '~/pages/dashboard/components/graphs-details/components/components.js';

type Properties = {
  records: RecordGetAllItemResponseDto[];
};

const GraphsDetails: React.FC<Properties> = ({ records }: Properties) => {
  return (
    <div className={styles['graph-details-wrapper']}>
        <GraphCard title='Expenses' >
            <ExpensesStructureGraphs records={records} />
        </GraphCard>
        <GraphCard title='Cash flow'>
            <CashFlowGraph records={records} />
        </GraphCard>
        <GraphCard title='Last records'>
            <RecordsList records={records} />
        </GraphCard>
    </div>
  );
};

export { GraphsDetails };
