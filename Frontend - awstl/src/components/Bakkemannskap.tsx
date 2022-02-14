import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import EngineeringIcon from '@mui/icons-material/Engineering';
import React from 'react'

function Bakkemannskap() {

  return (
        <Card sx={{ maxWidth: 350, mt: 5 }} style={{ background: '#0494ac' }}>
            <CardContent>
                <Typography variant="h5" color="white">
                    Bakkemannskap
                </Typography>
                <Typography sx={{ mb: 10, color: "white"}}>
                    Her ser du mest relevant informasjon om du er bakkemannskap
                </Typography>
                <Box sx={{ mb: 10}}textAlign='center' color='white'>
                    <EngineeringIcon sx={{ fontSize: 100 }}></EngineeringIcon>
                </Box>
                
                <Box textAlign='center'>
                    <Button variant="contained" sx={{background: 'white', color: '#0090a8' }}>Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default Bakkemannskap