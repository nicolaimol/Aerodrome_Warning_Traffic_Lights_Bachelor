import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import React from 'react'
import arbeiderInfo from '../model/arbeiderInfo'

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FlightIcon from '@mui/icons-material/Flight';

function ArbeiderKort(props:arbeiderInfo) {
/*
    let ikonElement = '<' + `${props.ikonNavn}` + ' sx={{ fontSize: 100 }}></ ' + `${props.ikonNavn}` + '>';
*/
    /*
    if (props.arbeider === 'flygeleder') {
        ikonElement = '<SupportAgentIcon sx={{ fontSize: 100 }}></ SupportAgentIcon>';
    } else if (props.arbeider === 'bakkemannskap') {
        ikonElement = '<EngineeringIcon sx={{ fontSize: 100 }}></ EngineeringAgentIcon>';
    } else {
        ikonElement = '<FlightIcon sx={{ fontSize: 100 }}></ FlightIcon>';
    }
    */


  return (
    <Card sx={{ maxWidth: 350, minWidth: 200, width:"25%", mt: 5, backgroundColor: '#0494ac'}}>
            <CardContent>
                <Typography sx={{ color: 'white' }} variant="h5">
                    {props.arbeider}
                </Typography>
                <Typography sx={{ mb: 10, color: "white"}}>
                    Her ser du mest relevant informasjon om du er {props.arbeider}
                </Typography>
                <Box sx={{ mb: 10, color: 'white' }} textAlign='center'>
                    {props.ikonComp}
                </Box>
                
                <Box textAlign='center'>
                    
                    <Button variant="contained" sx={{background: 'white', color: '#0090a8' }} >Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default ArbeiderKort