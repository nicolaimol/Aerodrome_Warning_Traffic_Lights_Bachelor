import '../App.css';
import React from 'react'

// Komponenter
import ArbeiderKort from './ArbeiderKort';

// MATERIAL UI ---

// MUI Komponenter
import { Box } from '@mui/material'

// Ikoner
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FlightIcon from '@mui/icons-material/Flight';

function Arbeider() {

  // Array med de tre ikonene og tilhørende string
  const arbeiderne = [
    ['Bakkemannskap', <EngineeringIcon sx={{ fontSize: 100 }}></ EngineeringIcon>], 
    ['Flygeleder', <SupportAgentIcon sx={{ fontSize: 100 }}></ SupportAgentIcon>], 
    ['Pilot', <FlightIcon sx={{ fontSize: 100 }}></ FlightIcon>]];

  return (
    <> 
    {/** Box med flex rundt */}
    <Box id="arbeiderBox" sx={{ mt: 8, mb: 5 }} style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", gap: '1em' /*justifyContent: 'space-evenly'*/, width: '100%', /*flexFlow: 'row wrap', alignItems: 'center'*/}}>
      
      {arbeiderne.map((personen) => { {/** Dynamisk lager et Arbeiderkort for hver av arbeiderne i arrayet */}
        return <ArbeiderKort key={personen[0].toString()} arbeider={personen[0].toString()} ikonComp={personen[1]} />
      })}
        
    </Box>
        
        
    </>

  )
}

export default Arbeider