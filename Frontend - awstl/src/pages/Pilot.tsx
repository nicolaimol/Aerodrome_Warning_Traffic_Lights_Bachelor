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

  const [weatherToAirport, setWeatherToAirport] = useState<any>(undefined);

    const updateAirportTo = (data: any) => {
      console.log(data)
      setToAirport(data)
    }

    const [avgangstid, setAvgangstid] = useState<any>('07:30');
    const [ankomsttid, setAnkomsttid] = useState<any>('07:30');

    useEffect(() => {
      if (toAirport != null) {
        const urlArvl = `/api/locationforecast?icao=${toAirport.icao}`

      axios.get(urlArvl)
            .then((response: any) => {
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
      console.log(toAirportRedux)
      if( toAirportRedux !== undefined){
        const reformatert = {
          navn: toAirportRedux.label,
          icao: toAirportRedux.icao,
          rwy: toAirportRedux.rwy
        }
        setToAirport( reformatert )
      }
      
    }, [toAirportRedux])

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
    <PilotVelgDepArvl updateTil={(tid:string) => setAnkomsttid(tid)} updateFra={(tid:string) => setAvgangstid(tid)} />
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
            <GrafikkPilot airport={airport} weather={fromWeather} time={avgangstid}/>
          }
        </div>
        { toAirport !== undefined && weatherToAirport !== undefined &&
            <div style={{ display: 'flex', maxWidth: '450px', minWidth: '280px', marginBottom: '1em'}}>
                <GrafikkPilot airport={toAirport} weather={weatherToAirport} time={ankomsttid} />
            </div>
        }
      </div>


    </ >
  )
}

export default Pilot

