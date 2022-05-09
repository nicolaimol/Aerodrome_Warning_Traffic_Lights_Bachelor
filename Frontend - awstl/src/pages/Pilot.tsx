import { Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import PilotFlyplassTo from '../components/PilotFlyplassTo'

import PilotVelgDepArvl from '../components/PilotVelgDepArvl'
import TafMetar from '../components/TafMetar'
import GrafikkPilot from '../components/GrafikkPilot'
import axios from 'axios'
import styles from '../style/Pilot.module.css'


function Pilot() {

  const dispatch = useDispatch()
  

  const terskel = useSelector((state: any) => state.terskel.value)
  const airport = useSelector((state: any) => state.airport.value)
  const fromWeather = useSelector((state: any) => state.weather.value)
  const toAirportRedux = useSelector((state: any) => state.toAirport.value)
  const [toAirport, setToAirport] = useState<any>(null)

  const [nesteDag, setNesteDag] = useState<boolean>(false);

  const [weatherToAirport, setWeatherToAirport] = useState<any>(undefined);

    const updateAirportTo = (data: any) => {

      setToAirport(data)
    }

  const dateNow = new Date().toLocaleString();

  const tidNow = dateNow.split(' ')[1].split(':')[0] + ':' + dateNow.split(' ')[1].split(':')[1]

  let minutt:string = tidNow.split(':')[1];
  let tilTime:string = tidNow.split(':')[0];

  if (+minutt <= 30){
    minutt = '30';
  } else {
    minutt = '00';
    if (tilTime === '23'){
      tilTime = '00';
    } else {
      tilTime = (+tilTime + 1).toString()
      if (tilTime.split('').length > 2){
        tilTime = '0' + tilTime;
      }
    }
  }

  const ankomstTime = (+tilTime === 23) ? '00' : (+tilTime < 9) ? ('0' + (+tilTime + 1).toString()) : (+tilTime + 1).toString();
  const printAnkomstTid = ankomstTime + ':' + minutt;

  const printTid = tilTime + ':' + minutt;

    const [avgangstid, setAvgangstid] = useState<any>(printTid);
    const [ankomsttid, setAnkomsttid] = useState<any>(printAnkomstTid);

    useEffect(() => {
      if (toAirport != null) {
        const urlArvl = `/api/locationforecast?icao=${toAirport.icao}`

      axios.get(urlArvl)
            .then((response: any) => {
              response.data.properties.timeseries.map((data: any) => {

                // calculate effective air temperature and set it to the instant object
                //if (data.properties.timeseries[0].data.instant.details.air_temperature < 10 && data.properties.timeseries[0].data.instant.details.wind_speed > 1.33) {
                        data.data.instant.details.effective_temperature = 
                        (13.12 + (data.data.instant.details.air_temperature * 0.6215)
                        - ((11.37 * Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))
                        + ((data.data.instant.details.air_temperature * 0.3965 ) * (Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))).toPrecision(2)
                     
                    
                //}


                data.data.instant.details.wind_speed = (data.data.instant.details.wind_speed * 1.943844).toPrecision(2);
                data.data.instant.details.wind_speed_of_gust = (data.data.instant.details.wind_speed_of_gust * 1.943844).toPrecision(2);
            })
              setWeatherToAirport(response.data)
            })
            .catch((error:any) => {
                if (error.status === 400) {
                  setWeatherToAirport(null)
                }
            })
      }
      
      
    }, [toAirport])

    useEffect(() => {

      if( toAirportRedux !== undefined){
        const reformatert = {
          navn: toAirportRedux.label,
          icao: toAirportRedux.icao,
          rwy: toAirportRedux.rwy
        }
        setToAirport( reformatert )
      }
      
    }, [toAirportRedux])

  
    useEffect(() => {
      const dateNowBool = new Date().toLocaleString();

      const tidNowBool = dateNowBool.split(' ')[1].split(':')[0] + ':' + dateNowBool.split(' ')[1].split(':')[1]

      if ((avgangstid < ankomsttid)){

        if ((tidNowBool > avgangstid) && (tidNowBool < ankomsttid)) {
          setNesteDag(true);
        } else setNesteDag(false);
        
      } else {

        if ((tidNowBool < avgangstid) && (tidNowBool > ankomsttid)){
          setNesteDag(false);
        } else {
          setNesteDag(true);
        }
      }
      
    }, [ankomsttid, avgangstid])

  return (
    <>
    <Container>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
    </div>

    <Typography sx={{ color: '#0090a8', fontSize: 40, textAlign: 'center', mt: 5}}>
        Rute
    </Typography>
    <Divider sx={{ mb: 5 }} />

    <PilotFlyplassTo update={updateAirportTo} />
    <PilotVelgDepArvl updateTil={(tid:string) => {setAnkomsttid(tid)}} updateFra={(tid:string) => {setAvgangstid(tid)}} />
    <Divider sx={{ mb: 5 }} />
        <div style={{textAlign: 'center', color: '#0090a8', marginBottom: '1em'}}>
            <Typography sx={{ mb: 3 }} variant="h4">Taf metar</Typography>
            <div className={styles.tafmetar}>
                { airport !== undefined && 
                        <TafMetar icao={airport.icao} />
                }
                {toAirportRedux !== undefined &&
                  <TafMetar icao={toAirportRedux.icao} />
                }
            </div>
        </div>
    <Divider sx={{ mb: 5 }} />

      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'stretch', flexGrow: '1'}}>
        {terskel !== undefined && 
        <VisSatteTerskelverdier terskel={terskel} />}
      </div>
      
      
    </Container>

    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexFlow: 'row wrap', backgroundColor: '#dff2f6'}}>

        <div style={{display: 'flex', maxWidth: '450px', minWidth: '280px', marginBottom: '1em'}}>
          {airport !== undefined && fromWeather !== undefined && 
            <GrafikkPilot airport={airport} weather={fromWeather} time={avgangstid} nextDay={false}/>
          }
        </div>
        { toAirport !== undefined && weatherToAirport !== undefined &&
            <div style={{ display: 'flex', maxWidth: '450px', minWidth: '280px', marginBottom: '1em'}}>
                <GrafikkPilot airport={toAirport} weather={weatherToAirport} time={ankomsttid} nextDay={nesteDag} />
            </div>
        }
      </div>


    </ >
  )
}

export default Pilot

