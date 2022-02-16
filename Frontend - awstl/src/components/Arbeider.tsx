import { Box } from '@mui/material'
import '../App.css';
import React from 'react'
import ArbeiderKort from './ArbeiderKort';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FlightIcon from '@mui/icons-material/Flight';

function Arbeider() {

  const arbeiderne = [
    ['Bakkemannskap', <EngineeringIcon sx={{ fontSize: 100 }}></ EngineeringIcon>], 
    ['Flygeleder', <SupportAgentIcon sx={{ fontSize: 100 }}></ SupportAgentIcon>], 
    ['Pilot', <FlightIcon sx={{ fontSize: 100 }}></ FlightIcon>]];

  return (
    <>
    <Box id="arbeiderBox" sx={{ m: 10 }} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

      {/* <Bakkemannskap />
        <Flygeleder />
        <Pilot />
        */}
      
      {arbeiderne.map((personen) => {
        return <ArbeiderKort arbeider={personen[0].toString()} ikonComp={personen[1]} />
      })}
        
    </Box>
        
        
    </>

  )
}

export default Arbeider