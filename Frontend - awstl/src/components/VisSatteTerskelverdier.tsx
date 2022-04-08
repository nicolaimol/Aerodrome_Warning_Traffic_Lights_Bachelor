import { Paper, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

import terskelData from '../model/terskelData'
import DrawerTerskelverdier from './DrawerTerskelverdier';

function VisSatteTerskelverdier(props:{terskel: terskelData}) {

  /*

  let terskelverdier = [
    ['Lufttemperatur', `${props.terskel.airTempMin}, ${props.terskel.airTempMax}`, '°C'],
    ['Nedbør', `${props.terskel.precipitationMin}, ${props.terskel.precipitationMax}`, 'mm'],
    ['Vindfart', `${props.terskel.windSpeedMin}, ${props.terskel.windSpeedMax}`, 'kt'],
    //['Vindretning', props.windDirection, '°'],
    ['Vindkast', `${props.terskel.windGustMin}, ${props.terskel.windGustMax}`, 'kt'],
    ['Sannsynlighet torden', `${props.terskel.probThunderMin}, ${props.terskel.probThunderMax}`, '%'],
    //['Kondenseringstemperatur', props.dewpoint, '°C'],
    ['Luftfuktighet', `${props.terskel.humidityMin}, ${props.terskel.humidityMax}`, '%'],
    ['Crosswind', `${props.terskel.crosswindMin}, ${props.terskel.crosswindMax}`, 'kt']
  ];
  */

  const [list, setList] = useState<any>(null)

  useEffect(() => {

    let terskelverdier = [];

    if (props.terskel.airTempActive){
      terskelverdier.push(['Lufttemperatur', `${props.terskel.airTempMin}, ${props.terskel.airTempMax}`, '°C'])
    }
    if (props.terskel.precipitationActive){
      terskelverdier.push(['Nedbør', `${props.terskel.precipitationMin}, ${props.terskel.precipitationMax}`, 'mm'])
    }
    if (props.terskel.windSpeedActive){
      terskelverdier.push(['Vindfart', `${props.terskel.windSpeedMin}, ${props.terskel.windSpeedMax}`, 'kt'])
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

  



  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column wrap', width: '40%', color: '#0090a8', minWidth: '300px'}}>
        <Typography style={{textAlign: 'center'}} variant='h4' gutterBottom>
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