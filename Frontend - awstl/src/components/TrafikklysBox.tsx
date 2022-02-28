import { Typography, Paper, Box } from '@mui/material'
import { borderRadius } from '@mui/system'
import React from 'react'

function TrafikklysBox() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'column wrap', width: '40%', color: '#0090a8'}}>
        <Typography variant='h4' gutterBottom>
            Trafikklys
        </Typography>
        <Paper elevation={3} sx={{ mb: 5}} style={{ color: '#0090a8', minHeight: '20vh', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center'}} >
        <Typography variant='h6' gutterBottom>
            Akkurat nå er det Grønt lys
        </Typography>
        <Box style={{borderRadius: '50%', backgroundColor: 'red', height: '100px', width: '100px'}}>

        </Box>
        <Box style={{borderRadius: '50%', backgroundColor: 'yellow', height: '100px', width: '100px'}}>
          
        </Box>
        <Box style={{borderRadius: '50%', backgroundColor: 'green', height: '100px', width: '100px'}}>
          
        </Box>
        </Paper>
    </div>
    </>
  )
}

export default TrafikklysBox