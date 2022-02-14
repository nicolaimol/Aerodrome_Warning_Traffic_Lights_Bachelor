import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import FlightIcon from '@mui/icons-material/Flight';
import React from 'react'

function Pilot() {

  return (
        <Card sx={{ maxWidth: 350, mt: 5}} style={{ backgroundColor: '#0494ac' }}>
            <CardContent>
                <Typography variant="h5" sx={{ color: 'white'}}>
                    Pilot
                </Typography>
                <Typography sx={{ mb: 10, color: "white"}}>
                    Her ser du mest relevant informasjon om du er pilot
                </Typography>
                <Box sx={{ mb: 10}}textAlign='center'>
                    <FlightIcon sx={{ fontSize: 100, color: 'white'}}></FlightIcon>
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" sx={{background: 'white', color: '#0090a8' }} >Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default Pilot