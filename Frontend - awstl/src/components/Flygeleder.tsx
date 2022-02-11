import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import React from 'react'

function Flygeleder() {

  return (
        <Card sx={{ maxWidth: 350, mt: 5 }}>
            <CardContent>
                <Typography variant="h5">
                    Flygeleder
                </Typography>
                <Typography sx={{ mb: 10, color: "text.secondary"}}>
                    Her ser du mest relevant informasjon om du er flygeleder
                </Typography>
                <Box sx={{ mb: 10}}textAlign='center'>
                    <SupportAgentIcon sx={{ fontSize: 100 }}></SupportAgentIcon>
                </Box>
                
                <Box textAlign='center'>
                    
                    <Button variant="contained" color='success' >Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default Flygeleder