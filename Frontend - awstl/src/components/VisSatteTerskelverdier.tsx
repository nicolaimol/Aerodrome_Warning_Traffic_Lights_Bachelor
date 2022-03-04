import { Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

import terskelData from '../model/terskelData'
import DrawerTerskelverdier from './DrawerTerskelverdier';

function VisSatteTerskelverdier(props:{terskel: terskelData}) {

  let terskelverdier = [
    ['Lufttemperatur', props.terskel.airTemp, '°C'],
    ['Nedbør', props.terskel.precipitationAmmount, 'mm'],
    ['Vindfart', props.terskel.windSpeed, 'm/s'],
    //['Vindretning', props.windDirection, '°'],
    ['Vindkast', props.terskel.windGust, 'm/s'],
    ['Sannsynlighet torden', props.terskel.probThunder, '%'],
    //['Kondenseringstemperatur', props.dewpoint, '°C'],
    ['Luftfuktighet', props.terskel.humidity, '%'],
    ['Tåke', props.terskel.fog, '%'],
    ['Issansynlighet', props.terskel.probIce, '%'],
    ['Crosswind', props.terskel.crosswind, 'm/s']];


  

  console.log(props);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column wrap', width: '40%', color: '#0090a8', minWidth: '300px'}}>
        <Typography variant='h4' gutterBottom>
            Satte terskelverdier
        </Typography>
        <Paper elevation={3} sx={{ pt: 5, pb: 5, mb: 5}} style={{ minHeight: '20vh', display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }} >
          <div>
            {terskelverdier.map((verdi) => {
          return <Typography key={verdi[0]} gutterBottom style={{ color: '#0090a8', fontSize: 20}}>
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