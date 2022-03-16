import { AppBar, Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'
import GrafikkTrafikklys from '../components/GrafikkTrafikklys'
import DrawerTerskelverdier from '../components/DrawerTerskelverdier'

import { calcFarge } from '../util/calcFarge'

function Pilot() {
  

  const terskel = useSelector((state: any) => state.terskel.value)
  const nowcast = useSelector((state: any) => state.nowcast.value)
  const airport = useSelector((state: any) => state.airport.value)

  const [color, setColor] = useState<string>("green")

  useEffect(() => {
    const temp = nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature

    setColor(temp > terskel?.airTemp ? "green" : temp == terskel?.airTemp ? "yellow" : "red")

    setColor(calcFarge(nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details, terskel!!, airport!!))


  }, [terskel, nowcast])

  return (
    <>
    <Container>

    <Typography sx={{ color: '#0090a8', fontSize: 40, textAlign: 'center', mt: 5}}>
          Pilot
        </Typography>
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
    </>
  )
}

export default Pilot