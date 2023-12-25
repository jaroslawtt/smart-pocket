import styles from './styles.module.scss';
import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import { Graph } from '~/libs/components/components.js';
import { recordsToCategoriesExpenses } from '~/pages/dashboard/components/graphs-details/components/expenses-structure-graphs/libs/records-to-categories-expenses.js';
import { type ChartData, ChartOptions } from 'chart.js';
import { generateRandomColors } from '~/pages/dashboard/components/graphs-details/components/expenses-structure-graphs/libs/generate-random-colors';

type Properties = {
  records: RecordGetAllItemResponseDto[];
};

export const options: ChartOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      font: {
        family: 'Lato',
      },
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: true,
      anchor: 'center',
      align: 'center',
      color: '#fff',
      font: {
        lineHeight: 1,
        size: 16,
      },
    },
  },
};

const ExpensesStructureGraphs: React.FC<Properties> = ({
  records,
}: Properties) => {
  const { data: graphData, labels } = recordsToCategoriesExpenses(records);

  const data: ChartData = {
    labels,
    datasets: [
      {
        data: graphData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: generateRandomColors(labels.length),
      },
    ],
  };

  return (
    <div className={styles['graph-wrapper']}>
      <div className={styles['graph-details']}>
        <span className={styles['graph-details-topic']}>Total amount: </span>
        <span className={styles['graph-details-caption']}>
        -UAH
          {` ${graphData.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0,
          )}`}
      </span>
      </div>
      <Graph options={options} data={data} type="doughnut" />
    </div>
  );
};

export { ExpensesStructureGraphs };
