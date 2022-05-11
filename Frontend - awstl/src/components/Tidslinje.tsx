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
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../Actions';
import { calcFarge } from '../util/calcFarge';
import { Button, Slider } from '@mui/material';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


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
        gradient.addColorStop(0.7, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(0.3, "green");
    }
    return gradient
}

function Tidslinje() {

    const dispatch = useDispatch()

    let scroll = document.getElementById("scrollableDiv")
    let index = 0;

    scroll?.addEventListener("wheel", (evt: any) => {

        if (Math.abs(evt.deltaY) > Math.abs(evt.deltaX)) {

            if ((evt.deltaY < 0 && scroll!!.scrollLeft == 0)) {

                return
            }

            if ((evt.deltaY > 0 && scroll!!.scrollLeft == 2144)) {
                return
            }

            evt.preventDefault()
            scroll!!.scrollLeft += (evt.deltaY/4);


        } else {

            evt.preventDefault()
            scroll!!.scrollLeft += (evt.deltaX/4);
        }
    })

    const airport:any = useSelector<string>((state:any) => state.airport.value)
    const terskel = useSelector((state: any) => state.terskel.value);
    const locfor = useSelector((state: any) => state.weather.value)

    const [ver, setVer] = useState<any>()
    const [labels, setLabels] = useState<any[]>([])
    const [dataset, setDataset] = useState<any[]>([])
    const [int, setInt] = useState<any>(null)
    const [sliderValue, setSliderValue] = React.useState<number>(0);
    const [started, setStarted] = useState<boolean>(false)

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            }
        },
        onClick: function (evt: any, ctx: any) {
            dispatch(allActions.grafikkAction.setGrafikk(ver[ctx[0].index]))
            setSliderValue(ctx[0].index)
        },
        scales: {
            y: {
                beginAtZero: false,
                suggestedMax: 4,
                suggestedMin: 0,
                grid: {
                    color: ['green', 'yellow', 'red'],
                },
                ticks: {
                    font: {
                        size: 30
                    },
                    color: ['green', 'yellow', 'red'],
                    textStrokeColor: ['', 'black', ''],
                    textStrokeWidth: 2,
                    precision: 0,
                    callback: function(value:any, index:number, ctx: any) {
                        if (value === 1) {
                            return "Grønn"
                        } else if (value === 2) {
                            return "Gul"
                        } else if (value === 3) {
                            return "Rød"
                        }

                        return

                    },
                    padding: 15,

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
                    return it < 2 ? "rgba(0,255,0, 0.5)": it === 2 ? "rgba(255,255,0, 0.5)" : "rgba(255,0,0, 0.5)"

                }),
                color: dataset.map((it:any) => {
                    return it > 2 ? "rgba(0,255,0, 0.5)": it === 2 ? "rgba(255,255,0, 0.5)" : "rgba(255,0,0, 0.5)"
                }),
                tension: 0.1
            },
        ],
    };

    const start = () => {
        setStarted(true)

    }

    const stop = () => {
        setStarted(false)
    }

    const tempSliderHandler = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    useEffect(() => {
        if (ver != undefined) {
            dispatch(allActions.grafikkAction.setGrafikk(ver[sliderValue]))
        }
    }, [sliderValue])

    useEffect(() => {
        const inteval = setInterval(() => {
            setStarted((statedIn: any) => {

                if (statedIn) {
                    setSliderValue((oldValue: any) => {
                        return oldValue + 1;
                    })

                }
                return statedIn
            })
        },
            3000)
        return () => clearInterval(inteval)
    }, [])

    useEffect(()=> {
        if(!airport) return;
        const herVer = locfor?.properties.timeseries
        if (herVer != undefined && herVer[0] != undefined) {
            dispatch(allActions.grafikkAction.setGrafikk(herVer[0]))

            setVer(herVer)
            setLabels(herVer.map((it: any) => {
                let string = new Date(it.time).toLocaleString();
                let list = string.split(",")

                let dato = list[0].split(".")
                dato.splice(2, 1)
                let datoString = dato.join(".")
                list[0] = datoString

                let tid = list[1].split(":")
                tid.splice(1, 2)
                let tidString = tid.join()
                list[1] = tidString
                return list.join(", kl:")
            }))
            setDataset(herVer.map((it: any) => {
                let precipitation_amount = 0;
                let probThunder = 0
                if ( it.data.next_1_hours != undefined) {
                    precipitation_amount =  it.data.next_1_hours.details.precipitation_amount
                    probThunder = it.data.next_1_hours.details.probability_of_thunder
                } else if (it.data.next_6_hours != undefined) {
                    precipitation_amount =  it.data.next_6_hours.details.precipitation_amount / 6
                    probThunder = it.data.next_6_hours.details.probability_of_thunder
                } else {
                    precipitation_amount =  it.data.next_12_hours.details.precipitation_amount / 12
                    probThunder = it.data.next_12_hours.details.probability_of_thunder
                }

                const farge = calcFarge(it.data.instant.details, terskel, airport,
                    {
                        precipitation_amount: precipitation_amount,
                        probThunder: probThunder
                    })

                switch (farge) {
                    case "green" : return 1
                    case "yellow" : return 2
                    case "red": return 3
                    default : return 0
                }
            }))
        }


    }, [locfor])
    
    useEffect(() => {
        if (ver !== undefined) {
            setDataset(ver.map((it: any) => {
                let precipitation_amount = 0;
                let probThunder = 0
                if ( it.data.next_1_hours !== undefined) {
                    precipitation_amount =  it.data.next_1_hours?.details.precipitation_amount
                    probThunder = it.data.next_1_hours?.details.probability_of_thunder
                } else if (it.data.next_6_hours !== undefined) {
                    precipitation_amount =  it.data.next_6_hours?.details.precipitation_amount / 6
                    probThunder = it.data.next_6_hours?.details.probability_of_thunder
                } else {
                    precipitation_amount =  it.data.next_12_hours?.details.precipitation_amount / 12
                    probThunder = it.data.next_12_hours?.details.probability_of_thunder
                }

                const farge = calcFarge(it.data.instant.details, terskel, airport, {
                    precipitation_amount: precipitation_amount,
                    probThunder: probThunder
                })
                    switch (farge) {
                        case "green" : return 1
                        case "yellow" : return 2
                        case "red": return 3
                        default : return 0
                    }
            }))
        }
    }, [terskel])

    

    // @ts-ignore
    return (
        <div>
            <div id='scrollableDiv' style={{width: "100%", overflowX: 'scroll', marginBottom: "5em"}}>
                <div style={{width: '3000px', height: '500px'}}>
                    {/* @ts-ignore*/}
                    <Line options={options} data={data} />
                </div>
            </div>
            <Button sx={{ mr: 2, backgroundColor: '#0494ac'}} variant="contained" onClick={start}>Animasjon</Button>
            <Button sx={{ mr: 2, backgroundColor: '#0494ac'}} variant="contained" onClick={stop}>Stopp</Button>
            {
                ver !== undefined &&
                <Slider
                    onChange={tempSliderHandler}
                    defaultValue={0}
                    value={sliderValue}
                    valueLabelFormat={(value: number) => labels[value]}
                    step={1}
                    min={0}
                    max={ver.length - 1}

                    valueLabelDisplay="auto"
                />
            }
        </div>

  )
}

export default Tidslinje
