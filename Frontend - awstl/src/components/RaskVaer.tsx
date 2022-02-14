import { Container, AppBar, Typography } from '@mui/material'
import React from 'react'
import VaerBox from './VaerBox'

function RaskVaer() {

  

  return (
    <>
    <Container>
        <AppBar sx={{ mb: 10 }} position='static' style= {{ background: 'white', textAlign: 'center' }}>
            <Typography sx={{ color: '#0090a8', fontSize: 30}}>
                Været akkurat nå
            </Typography>
        </AppBar>
        <VaerBox navn="Gardermoen" beskrivelse="Hei" temperatur={1} styrke="100" retning="øst" ikonNavn="clearsky_polartwilight.svg"/>
    </Container>
    </>
  )
}

export default RaskVaer