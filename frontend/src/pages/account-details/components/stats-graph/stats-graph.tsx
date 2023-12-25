import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import styles from './styles.module.scss';
import { ChartData, ChartOptions } from 'chart.js';
import { Graph } from '~/libs/components/components.js';
import React from 'react';
import { MAX_NUMBER_LABELS } from '~/pages/account-details/components/stats-graph/libs/constants';

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Balance',
    },
    datalabels: {
      display: false,
    }
  },
};

const getRecordGraphData = (
  records: RecordGetAllItemResponseDto[],
): { data: Array<number>; labels: Array<string> } => {
  const labels: Array<Date> = new Array(MAX_NUMBER_LABELS)
    .fill(null)
    .reduce(
      (accumulator): { labels: Array<string>; date: Date } => {
        const { labels, date } = accumulator;

        labels.push(new Date(date));
        accumulator.date = new Date(
          accumulator.date.setDate(accumulator.date.getDate() - 4),
        );

        return accumulator;
      },
      { labels: [], date: new Date() },
    )
    .labels.reverse();

  const data = labels.map((label) => {
    const leftSideValues = records.filter(
      (record) => new Date(record.date) <= label,
    );

    if (leftSideValues.length === 0) {
      const rightSideValues = records.filter(
        (record) => new Date(record.date) >= label,
      );

      if (rightSideValues.length > 0) {
        rightSideValues.sort();

        const record = rightSideValues[0] as RecordGetAllItemResponseDto;

        return record.amount + record.remnant;
      }
    } else {
      leftSideValues.sort().reverse();

      const record = leftSideValues[0] as RecordGetAllItemResponseDto;

      return record.remnant;
    }
  });

  return {
    data: data as Array<number>,
    labels: labels.map((label) =>
      label.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' }),
    ),
  };
};

type Properties = {
  records: RecordGetAllItemResponseDto[];
};
const StatsGraph: React.FC<Properties> = ({ records }) => {
  const { labels, data: testData } = getRecordGraphData(records);

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: testData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: '#fff',
      },
    ],
  };

  return (
    <Graph
      type="line"
      options={options}
      data={data}
      width={1260}
      height={450}
    ></Graph>
  );
};

export { StatsGraph };
