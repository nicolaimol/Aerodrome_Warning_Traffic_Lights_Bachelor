import { Container, AppBar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import VaerBox from './VaerBox'
import axios from 'axios'
import vaerboksForecast from '../model/vaerboksForecast';



function RaskVaer() {

  const [vdata, setVData] = useState<vaerboksForecast | null>(null);

  const favoritt = "ENDU";

  useEffect(() => {
    axios.get('http://localhost:8080/api/nowcast?icao=ENDU')
    .then((response) => {
      setVData(response.data);
    })
  },[])

  console.log(vdata);

  return (
    <>
    <Container>
        <AppBar sx={{ mb: 10 }} position='static' style= {{ background: 'white', textAlign: 'center' }}>
            <Typography sx={{ color: '#0090a8', fontSize: 30}}>
                Været akkurat nå
            </Typography>
        </AppBar>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-bet'}}>
          { vdata != null && 
            vdata.nowcasts.map((flyplass, index) => {
              return <VaerBox key={index} properties={flyplass.properties} airports={vdata.airports[index]} ></VaerBox>
            })}
        </div>
        
        { /* <VaerBox navn="Gardermoen" beskrivelse="Hei" temperatur={1} styrke="100" retning="øst" ikonNavn="clearsky_polartwilight.svg"/> */ }
    </Container>
    </>
  )
}

export default RaskVaer
