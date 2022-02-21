import { Typography, Paper } from '@mui/material'
import React from 'react'

function TrafikklysBox() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'column wrap', width: '40%'}}>
        <Typography variant='h4' gutterBottom>
            Trafikklys
        </Typography>
        <Paper elevation={3} sx={{ mb: 5}} style={{ height: '20vh' }} >
        <Typography variant='h6' gutterBottom>
            lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor lorem ipsum dolor sit
        </Typography>
        </Paper>
    </div>
    </>
  )
}

export default TrafikklysBox