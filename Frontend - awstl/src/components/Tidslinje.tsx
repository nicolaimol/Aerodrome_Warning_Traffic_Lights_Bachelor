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

export const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
            precision: 0,
            callback: function(value:any, index:number) {
                console.log(value)
                let string = ""
                if (value > 2) {
                    return "green"
                } else if (value === 2) {
                    return "yellow"
                }
                return "red"
                /*
                if (getLabelForValue(context.value) == 2) {
                    return 2
                }

                 */
            }
        }
      },
    },
    
  };

const labels = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,2,2,3,3,2,3,1,1,1,2,2],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

function Tidslinje() {
  // @ts-ignore
    return (
    <Line options={options} data={data} />
  )
}

export default Tidslinje
