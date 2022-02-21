import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//import { getLabelForValue } from 'chart.js/helpers';

const ylabel = ['Rød', 'Grønn', 'Gul'];

const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        grid: {
          color: ['red', 'yellow', 'green'],
        },
        ticks: {
            color: ['red', 'yellow', 'green'],
            precision: 0,
            callback: function(value:any, index:number) {
                console.log(value)
                let string = ""
                if (value > 2) {
                    return "Grønn"
                } else if (value === 2) {
                    return "Gul"
                }
                return "Rød"
            }
        }
      },
    },
    
  };

const labels = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'];
const dataset = [1,2,2,2,3,3,2,3,1,1,1,2,2]


const getGradient = (ctx: any, chartArea: any) => {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "green");
    }
    return gradient
}

/*export*/ const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: dataset,
      borderColor: function (context: any) {
          const chart = context.chart
          const {ctx, chartArea} = chart

          if (!chartArea) return

          return getGradient(ctx, chartArea )
      },
      color: dataset.map((it:any) => {
          return it > 2 ? "green" : "red"
      }),
    },
  ],
};


function Tidslinje() {

    return (
    <Line options={options} data={data} />
  )
}

export default Tidslinje
