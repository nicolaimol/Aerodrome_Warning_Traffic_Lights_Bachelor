import { Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'
import GrafikkTrafikklys from '../components/GrafikkTrafikklys'
import PilotFlyplassTo from '../components/PilotFlyplassTo'

import { calcFarge } from '../util/calcFarge'
import PilotVelgDepArvl from '../components/PilotVelgDepArvl'
import TafMetar from '../components/TafMetar'
import allActions from '../Actions'



function Pilot() {

  const dispatch = useDispatch()
  

  const terskel = useSelector((state: any) => state.terskel.value)
  const nowcast = useSelector((state: any) => state.nowcast.value)
  const airport = useSelector((state: any) => state.airport.value)
  const toAirportRedux = useSelector((state: any) => state.toAirport.value)

  const [color, setColor] = useState<string>("green")
  const [toAirport, setToAirport] = useState<any>(null)

  useEffect(() => {
    const temp = nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature

    setColor(temp > terskel?.airTemp ? "green" : temp == terskel?.airTemp ? "yellow" : "red")

    setColor(calcFarge(nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details, terskel!!, airport!!,
        {
          precipitation_amount: 0,
          probThunder: 0
        }))
  }, [terskel, nowcast])

    const updateAirportTo = (data: any) => {
      console.log(data)
      setToAirport(data)
    }

  return (
    <>
    <Container>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', flexFlow: 'row wrap', alignItems: 'center'}}>
    </div>

    <Typography sx={{ color: '#0090a8', fontSize: 40, textAlign: 'center', mt: 5}}>
        Pilot
    </Typography>
    <Divider sx={{ mb: 5 }} />

    <PilotFlyplassTo update={updateAirportTo} />
    <PilotVelgDepArvl />
    <Divider sx={{ mb: 5 }} />
        <div style={{textAlign: 'center', color: '#0090a8', marginBottom: '1em'}}>
            <Typography sx={{ mb: 3 }} variant="h4">Taf metar</Typography>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em'}}>
                { airport != undefined && 
                    <>
                        <TafMetar icao={airport.icao} />
                    </>
                }
                {toAirportRedux != undefined &&
                  <TafMetar icao={toAirportRedux.icao} />
                }
            </div>
        </div>
    <Divider sx={{ mb: 5 }} />

      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'stretch'}}>
        {terskel != undefined && 
        <VisSatteTerskelverdier terskel={terskel} />}
        <TrafikklysBox farge={color} />
      </div>
      

      <div>
            <Typography sx={{ color: '#0090a8', fontSize: 30, textAlign: 'center'}}>
                Tidslinje for de neste 72 timer
            </Typography>
            <Divider sx={{ mb: 5}} />
        <Tidslinje />
      </div>
    </Container>
      <GrafikkTrafikklys />
    </ >
  )
}

export default Pilot

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
