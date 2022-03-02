import React, { useState, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux'
import allActions from '../Actions'

import axios from 'axios'

// Interface
import vaerboksForecast from '../model/vaerboksForecast';

// komponenter
import VaerBox from './VaerBox'

// Material UI
import { Container, AppBar, Typography } from '@mui/material'



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
    if (nowcast === null || nowcast === undefined) {
      axios.get(`${url}ENDU`) // Henter værdata for 3 flyplasser + en egendefinert
      .then((response) => {
        setVData(response.data); // Setter værdata
        dispatch(allActions.nowcastAction.setNowcast(response.data))
        console.log("henter fra server")
      })
    } else {
      console.log("har fra redux") // Trenger ikke så lenge vi allerede har dataen
      setVData(nowcast)
    }
  },[])

  useEffect(() => {
    if (time > 0 && airportRedux != null && airportRedux != undefined) {
      axios.get(`${url}${airportRedux?.icao}`)
        .then((response: any) => {
          setVData(response.data);
          dispatch(allActions.nowcastAction.setNowcast(response.data))
          console.log("henter fra server")
      })
    } 
    setTime(1)
  }, [airportRedux])


  return (
    <>
    <Container>
      {/** Avbrekker som viser at under fortelles været akkurat nå */}
        <AppBar sx={{ mb: 10 }} position='static' style= {{ background: 'white', textAlign: 'center' }}>
            <Typography sx={{ color: '#0090a8', fontSize: 30}}>
                Været akkurat nå
            </Typography>
        </AppBar>

        {/** Lager en 'VaerBox' komponent for hver flyplass vi har hentet værdata fra */}
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'center'}}>
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
