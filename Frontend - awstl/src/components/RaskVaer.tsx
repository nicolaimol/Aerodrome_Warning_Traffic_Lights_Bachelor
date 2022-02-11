import { Container, AppBar, Typography } from '@mui/material'
import React from 'react'
import VaerBox from './VaerBox'

function RaskVaer() {

  return (
    <>
    <Container>
        <AppBar sx={{ mb: 10 }} position='static' style= {{ background: '#2E3B55', textAlign: 'center' }}>
            <Typography>
                Været akkurat nå
            </Typography>
        </AppBar>
        <VaerBox navn="Gardermoen" beskrivelse="Hei" styrke="100" retning="øst" ikonNavn="clearsky_polartwilight.svg"/>
    </Container>
    </>
  )
}

export default RaskVaer