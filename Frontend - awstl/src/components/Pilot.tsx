import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import FlightIcon from '@mui/icons-material/Flight';
import React from 'react'

function Pilot() {

  return (
        <Card sx={{ maxWidth: 350, mt: 5}}>
            <CardContent>
                <Typography variant="h5">
                    Pilot
                </Typography>
                <Typography sx={{ mb: 10, color: "text.secondary"}}>
                    Her ser du mest relevant informasjon om du er pilot
                </Typography>
                <Box sx={{ mb: 10}}textAlign='center'>
                    <FlightIcon sx={{ fontSize: 100 }}></FlightIcon>
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" color='success' >Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default Pilot