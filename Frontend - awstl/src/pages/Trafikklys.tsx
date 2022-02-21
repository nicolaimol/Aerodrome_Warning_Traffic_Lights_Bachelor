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
        <VisSatteTerskelverdier />
        <TrafikklysBox />
      </div>
      */}
      <div>
        <Tidslinje />
      </div>
    </Container>
    </>
  )
}

export default Trafikklys