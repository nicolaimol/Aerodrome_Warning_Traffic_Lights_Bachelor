import { AppBar, Container, Typography } from '@mui/material'
import React from 'react'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'
import GrafikkTrafikklys from '../components/GrafikkTrafikklys'
import DrawerTerskelverdier from '../components/DrawerTerskelverdier'

function Trafikklys() {
  return (
    <>
    <Container>
      <DrawerTerskelverdier />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap', alignItems: 'center'}}>
        <VisSatteTerskelverdier 
      airTemp={0}
      precipitationAmmount={20}
      windSpeed={30}
      windDirection={180}
      windGust={40}
      probThunder={50}
      dewpoint={4}
      humidity={2}
      fog={40}

      probIce={20}
      crosswind={50}
      />
        <TrafikklysBox />
      </div>
      

      <div>
      <AppBar sx={{ mb: 10 }} position='static' style= {{ background: 'white', textAlign: 'center' }}>
            <Typography sx={{ color: '#0090a8', fontSize: 30}}>
                Tidslinje for de neste 72 timer
            </Typography>
        </AppBar>
        <Tidslinje />
      </div>
      <GrafikkTrafikklys />
    </Container>
    </>
  )
}

export default Trafikklys