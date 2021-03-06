import { Paper, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

import terskelData from '../model/terskelData'
import DrawerTerskelverdier from './DrawerTerskelverdier';

function VisSatteTerskelverdier(props:{terskel: terskelData}) {

  const [list, setList] = useState<any>(null)
  const [mobil, setMobil] = React.useState(false);

  useEffect(() => {

    let terskelverdier = [];

    if (props.terskel.airTempActive){
      terskelverdier.push(['Lufttemperatur', `${props.terskel.airTempMin}, ${props.terskel.airTempMax}`, '°C'])
    }
    if (props.terskel.precipitationActive){
      terskelverdier.push(['Nedbør', `${props.terskel.precipitationMin}, ${props.terskel.precipitationMax}`, 'mm'])
    }
    if (props.terskel.windSpeedActive){
      terskelverdier.push(['Vindhastighet', `${props.terskel.windSpeedMin}, ${props.terskel.windSpeedMax}`, 'kt'])
    }
    if (props.terskel.windGustActive){
      terskelverdier.push(['Vindkast', `${props.terskel.windGustMin}, ${props.terskel.windGustMax}`, 'kt'])
    }
    if (props.terskel.probThunderActive){
      terskelverdier.push(['Sannsynlighet torden', `${props.terskel.probThunderMin}, ${props.terskel.probThunderMax}`, '%'])
    }
    if (props.terskel.humidityActive){
      terskelverdier.push(['Luftfuktighet', `${props.terskel.humidityMin}, ${props.terskel.humidityMax}`, '%'])
    }
    if (props.terskel.crosswindActive){
      terskelverdier.push(['Crosswind', `${props.terskel.crosswindMin}, ${props.terskel.crosswindMax}`, 'kt'])
    }

    if (terskelverdier.length > 0) {
      setList(terskelverdier)
    } else setList(null)
    

  }, [props])

  useEffect(() => {

    (window.innerWidth > 400) ? setMobil(false) : setMobil(true);

    window.addEventListener('resize', () => {
      (window.innerWidth > 400) ? setMobil(false) : setMobil(true);
    });

    return () => window.removeEventListener('resize', () => {});
  }, []);
  
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column wrap', width: '40%', color: '#0090a8', minWidth: '270px'}}>
      <Typography style={{textAlign: 'center'}} variant={mobil ? "h5": "h4"} gutterBottom>
        Satte terskelverdier
      </Typography>
      <Paper elevation={3} sx={{ pt: 5, pb: 5, mb: 5}} style={{ minHeight: '20vh', display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }} >
        <div>
          {list !== null ? list.map((verdi: any) => {
          return <Typography key={verdi[0]} gutterBottom style={{ color: '#0090a8', fontSize: 20}} sx={{ pl: '1em'}}>
            {verdi[0]}: {verdi[1]} {verdi[2]}
          </Typography>
          }): 
          <>
            <Typography gutterBottom style={{ color: '#0090a8', fontSize: 20}} sx={{ pl: '1em'}}>Ingen verdier aktive</Typography>
            <Typography gutterBottom style={{ color: '#0090a8', fontSize: 20}} sx={{ pl: '1em'}}>Du kan velge verdier ved å klikke på hjulet</Typography>
          </>
          }
        </div>
        <div>
          <DrawerTerskelverdier />
        </div>
      </Paper> 
    </div>
    </>
  )
}

export default VisSatteTerskelverdier