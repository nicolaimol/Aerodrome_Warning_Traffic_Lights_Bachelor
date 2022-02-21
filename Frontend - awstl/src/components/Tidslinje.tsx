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
import {
    useState,
    useEffect
} from "react";
import axios from 'axios'


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

function Tidslinje() {

    const [ver, setVer] = useState<any>()
    const [temp,  setTemp] = useState(0);
    const [labels, setLabels] = useState<any[]>([1,2,2,2,3,3,2,3,1,1,1,2,2])
    const [dataset, setDataset] = useState<any[]>([1,2,2,2,3,3,2,3,1,1,1,2,2])

    //let labels = [1,2,2,2,3,3,2,3,1,1,1,2,2];
    //let dataset = [1,2,2,2,3,3,2,3,1,1,1,2,2]

    useEffect(()=> {
        axios.get("http://localhost:8080/api/locationforecast?icao=enbr")
            .then((response:any) => {
                //console.log(response)
                const herVer = response.data.properties.timeseries
                setVer(herVer.map((it: any) => {
                    return it.data.instant.details.air_temperature
                }))
                setLabels(herVer.map((it: any) => {
                    return it.time
                }))
                setDataset(herVer.map((it: any) => {
                    return it.data.instant.details.air_temperature > temp ? 3 :
                        it.data.instant.details.air_temperature == temp ? 2: 1
                }))
            })
    }, [])

    useEffect(() => {
        if (ver !== undefined) {
            setDataset(ver.map((it: any) => {
                return it > temp ? 3 :
                    it == temp ? 2: 1
            }))
        }
    }, [temp])

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        onClick: function (evt: any, ctx: any) {
            console.log(ctx)
            alert(`Du valgte ${labels[ctx[0].index]} med temp ${ver[ctx[0].index]}`)
        },
        scales: {
            y: {
                grid: {
                    color: ['red', 'yellow', 'green'],
                },
                ticks: {
                    stepSize: 1,
                    max: 3,
                    min: 1,
                    color: ['red', 'yellow', 'green'],
                    precision: 0,
                    callback: function(value:any, index:number, ticks: any) {
                        //console.log(ticks)
                        let string = ""
                        if (value > 2) {
                            return "Grønn"
                        } else if (value === 2) {
                            return "Gul"
                        }
                        return "Rød"
                    },
                    grace: '10%'
                }
            },
        },

    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataset,
                pointRadius: 15,
                borderColor: function (context: any) {
                    const chart = context.chart
                    const {ctx, chartArea} = chart

                    if (!chartArea) return

                    return getGradient(ctx, chartArea )
                },
                backgroundColor: dataset.map((it:any) => {
                    return it > 2 ? "rgba(0,255,0, 0.5)": it == 2 ? "rgba(255,255,0, 0.5)" : "rgba(255,0,0, 0.5)"

                }),
                color: dataset.map((it:any) => {
                    return it > 2 ? "green" : "red"
                }),
                tension: 0.1
            },
        ],
    };




    // @ts-ignore
    return (

        <div>
            <input type="range" min="-20" max="20" value={temp} onChange={e => setTemp(Number(e.target.value))}></input><span>{temp}</span>
        <div style={{width: "100%", overflow: 'scroll'}}>
            <div style={{width: '200vw', height: '500px'}}>
                {/* @ts-ignore*/}
                <Line options={options} data={data} />
            </div>

        </div>
        </div>

  )
}

export default Tidslinje
