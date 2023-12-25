import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  type ChartType,
} from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

type Properties = {
  options: ChartOptions;
  data: ChartData;
  type: ChartType;
  width?: number | string | undefined;
  height?: number | string | undefined;
  className?: string | undefined;
};

const Graph: React.FC<Properties> = ({
  data,
  options,
  type,
  height,
  width,
  className,
}: Properties) => {

  return (
    <Chart
      type={type}
      data={data}
      options={options}
      className={className}
      width={width}
      height={height}
    />
  );
};

export { Graph };
