import { Container, AppBar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import VaerBox from './VaerBox'
import axios from 'axios'



function RaskVaer() {

  const [vdata, setVData] = useState(null);

  const favoritt = "ENDU";

  useEffect(() => {
    axios.get('/api/nowcast?ICAO=' + {favoritt})
    .then((response) => {
      console.log(response);
      setVData(response.data);
    })
  })

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
