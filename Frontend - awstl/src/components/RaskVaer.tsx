import React, { useState, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux'
import allActions from '../Actions'

import axios from 'axios'

// Interface
import vaerboksForecast from '../model/vaerboksForecast';

// komponenter
import VaerBox from './VaerBox'

// Material UI
import { Container, Typography, Divider } from '@mui/material'

import styles from '../style/RaskVaer.module.css'

function RaskVaer() {

  const [vdata, setVData] = useState<vaerboksForecast | null>(null); // Værdata skal kunne settes gjennom interfacet 'vaerboksForecast'
  const [time, setTime] = useState<number>(0)

  const nowcast = useSelector((state:any) => state.nowcast.value)
  const airportRedux = useSelector((state:any) => state.airport.value)

  const dispatch = useDispatch()

  let url = ""

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { // Uavhengig om det er local testing eller deployment så fungerer API kall
      if (process.env.REACT_APP_URL_ENV == "prod") {
          url = '/api/nowcast?icao='
      } else {
          url = 'http://localhost:8080/api/nowcast?icao='
      }
} else {
    url = '/api/nowcast?icao='
}

  useEffect(() => {
      setVData(nowcast)
  },[nowcast])


  return (
    <>
    <Container>
      {/** Avbrekker som viser at under fortelles været akkurat nå */}
      <Typography sx={{ color: '#0090a8', fontSize: 30, textAlign: 'center'}}>
        Været akkurat nå
      </Typography>
      <Divider sx={{ mb: 5}} />
      {/** Lager en 'VaerBox' komponent for hver flyplass vi har hentet værdata fra */}
      <div className={styles.vaerGrid}>
        { vdata != null && 
          vdata.nowcasts.map((flyplass, index) => {
            return <VaerBox key={index} properties={flyplass.properties} airports={vdata.airports[index]} stjerne={ index === 0 ? true : false} ></VaerBox>
          })}
      </div>  
    </Container>
    </>
  )
}

export default RaskVaer
