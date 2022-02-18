import { Paper, Typography } from '@mui/material'
import React from 'react'

function VisSatteTerskelverdier() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', alignItems: 'center', width: '50%'}}>
        <Typography variant='h2' gutterBottom component='div'>
            Satte terskelverdier
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

export default VisSatteTerskelverdier