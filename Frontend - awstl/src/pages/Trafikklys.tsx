import { AppBar, Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'
import GrafikkTrafikklys from '../components/GrafikkTrafikklys'
import DrawerTerskelverdier from '../components/DrawerTerskelverdier'

import { calcFarge } from '../util/calcFarge'
import TafMetar from '../components/TafMetar'

function Trafikklys() {
  

  const terskel = useSelector((state: any) => state.terskel.value)
  const nowcast = useSelector((state: any) => state.nowcast.value)
  const airport = useSelector((state: any) => state.airport.value)

  const [color, setColor] = useState<string>("green")
  const [hjemMobil, setHjemMobil] = React.useState(false);

  useEffect(() => {
    const temp = nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature

    setColor(temp > terskel?.airTemp ? "green" : temp == terskel?.airTemp ? "yellow" : "red")

    setColor(calcFarge(nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details, terskel!!, airport!!,
        {
            precipitation_amount: 0,
            probThunder: 0
        }))


  }, [terskel, nowcast])

  useEffect(() => {

    (window.innerWidth > 849) ? setHjemMobil(false) : setHjemMobil(true);
  
          window.addEventListener('resize', () => {
              (window.innerWidth > 849) ? setHjemMobil(false) : setHjemMobil(true);
          });
  
          return () => window.removeEventListener('resize', () => {});
      }, []);

  return (
    <>
    <Container>

    <Typography sx={{ color: '#0090a8', fontSize: hjemMobil ? 30 : 40, textAlign: 'center', mt: 5}}>
          Flyplass{hjemMobil ? (' - ' + airport?.navn) : ""}
        </Typography>
        <Divider sx={{ mb: 5 }} />

      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'stretch'}}>

      <TrafikklysBox farge={color} />  
      {terskel != undefined &&
        <VisSatteTerskelverdier terskel={terskel} />}
        
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

export default Trafikklys