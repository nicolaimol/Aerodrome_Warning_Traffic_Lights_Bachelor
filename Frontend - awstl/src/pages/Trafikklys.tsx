import { Container } from '@mui/material'
import React from 'react'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'

function Trafikklys() {
  return (
    <>
    <Container>
      {/*
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'center'}}>
        
        <TrafikklysBox />
      </div>
      */}
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
      <div>
        <Tidslinje />
      </div>
    </Container>
    </>
  )
}

export default Trafikklys