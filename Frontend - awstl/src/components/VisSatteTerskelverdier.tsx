import { Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

import terskelData from '../model/terskelData'
import DrawerTerskelverdier from './DrawerTerskelverdier';

function VisSatteTerskelverdier(props:terskelData) {

  let terskelverdier = [
    ['Lufttemperatur', props.airTemp, '°C'],
    ['Nedbør', props.precipitationAmmount, 'mm'],
    ['Vindfart', props.windSpeed, 'm/s'],
    ['Vindretning', props.windDirection, '°'],
    ['Vindkast', props.windGust, 'm/s'],
    ['Sannsynlighet torden', props.probThunder, '%'],
    ['Kondenseringstemperatur', props.dewpoint, '°C'],
    ['Luftfuktighet', props.humidity, '%'],
    ['Tåke', props.fog, '%'],
    ['Issansynlighet', props.probIce, '%'],
    ['Crosswind', props.crosswind, 'm/s']];


  

  console.log(props);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', width: '40%', color: '#0090a8'}}>
        <Typography variant='h4' gutterBottom>
            Satte terskelverdier
        </Typography>
        <Paper elevation={3} sx={{ mb: 5}} style={{ minHeight: '20vh', display: 'flex', justifyContent: 'space-evenly' }} >
          <div>
            {terskelverdier.map((verdi) => {
          return <Typography key={verdi[0]} gutterBottom style={{ color: '#0090a8'}}>
            {verdi[0]}: {verdi[1]}{verdi[2]}
          </Typography>
          })}
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