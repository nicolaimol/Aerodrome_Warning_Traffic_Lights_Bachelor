import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import airports from '../model/airports'
import { LocationForecast, Timesery } from '../model/locfor'

function GrafikkPilot(props: {airport:airports, weather:LocationForecast, time: string}) {

    const airport = props.airport;
  
    const [weather, setWeather] = useState<Timesery | null>(null)

    useEffect(() => {
          props.weather.properties?.timeseries.forEach((it: any) => {
              if (it.time.split("T")[1].split(":")[0] == props.time.split(":")[0]) {
                    setWeather(it)
              }
          })  
    }, [props.time])

    const terskel = useSelector((state: any) => state.terskel.value);


    const [temperatureColor, setTemperatureColor] = useState<any>(null)
    const [ikonpath, setIkonpath] = useState<string>("")
    const [nedbor, setNedbor] = useState<string>("")

    useEffect(() => {
        if (weather != undefined) {
            let ikonpath2:string =  "/weatherIcons/";
        if (weather?.data.next_1_hours != null)  ikonpath2 +=weather?.data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else if (weather?.data.next_6_hours != null)  ikonpath2 +=weather?.data.next_6_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else  ikonpath2 +=weather?.data.next_12_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        setIkonpath(ikonpath2)
        setTemperatureColor(weather?.data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'); // Er det pluss eller minus grader? farge avhenger av dette

        if (weather?.data.next_1_hours != null) setNedbor(weather?.data.next_1_hours.details.precipitation_amount + "mm neste 1 time")
        else if (weather?.data.next_6_hours != null) setNedbor(weather?.data.next_6_hours.details.precipitation_amount + "mm neste 6 timer")
        }
        
    }, [weather])
    

    if (weather != undefined) {
        const windDir = weather?.data.instant.details.wind_from_direction > 0 ?
        weather?.data.instant.details.wind_from_direction :
        360 + weather?.data.instant.details.wind_from_direction

        const rwyDiff1 = Math.abs(10*Number(airport?.rwy?.split("/")[0]) - windDir)
        const rwyDiff2 = Math.abs(10*Number(airport?.rwy?.split("/")[1]) - windDir)

        const cw = weather?.data.instant.details.wind_speed * Math.sin
        ((Math.min(
            rwyDiff1 ,
            rwyDiff2
        ) / 360) * 2 * Math.PI)
    } else {return <div>Feil i grafikk</div>}
    

    

    


    let precipitation_amount = 0;
    let probThunder = 0
    if ( weather?.data.next_1_hours !== undefined) {
        precipitation_amount =  weather?.data?.next_1_hours?.details?.precipitation_amount
        probThunder = weather?.data.next_1_hours?.details?.probability_of_thunder
    } else if (weather?.data.next_6_hours !== undefined) {
        precipitation_amount =  weather?.data?.next_6_hours?.details?.precipitation_amount / 6
    }





  return (
    <>

    </>
  )
}

export default GrafikkPilot