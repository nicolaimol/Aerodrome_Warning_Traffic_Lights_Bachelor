import '../App.css';
import React from 'react'
import styles from '../style/Arbeider.module.css'

// Komponenter
import ArbeiderKort from './ArbeiderKort';

// MATERIAL UI ---

// MUI Komponenter
import { Box } from '@mui/material'

// Ikoner
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FlightIcon from '@mui/icons-material/Flight';
import MapIcon from '@mui/icons-material/Map';

function Arbeider() {

  // Array med de tre ikonene og tilhørende string
  const arbeiderne = [
    ['Flygeleder', <SupportAgentIcon sx={{ fontSize: 100 }}></ SupportAgentIcon>, 
    'Denne siden gir et 72 timers varsel for en flyplass. Dette varselet vil bli vist som et trafikklys. Siden er hovedsakelig tiltenkt flygeledere og bakkemannskap. Man kan også endre terskelverdiene som varselet baseres på, samt huke de av om man ikke tenker de relevant',
     'Flyplass'], 
    ['Pilot', <FlightIcon sx={{ fontSize: 100 }}></ FlightIcon>,
    'Her vil du få TAF of METAR for 2 flyplasser, og du kan se annen relevant informasjon om hver flyplass. Siden er tiltenkt piloter.',
    'Rute'],
    ['Kart', <MapIcon sx={{ fontSize: 100 }}></ MapIcon>,
    'Her vil du se kart av type sigchart og vær',
    'Kart']
  ];

  return (
    <> 
    {/** Box med flex rundt */}
    <div id="arbeiderBox" className={styles.arbeiderGrid} /*sx={{ mt: 8, mb: 5 }}*/>
      
      {arbeiderne.map((personen) => { {/** Dynamisk lager et Arbeiderkort for hver av arbeiderne i arrayet */}
        return <ArbeiderKort key={personen[0].toString()} arbeider={personen[0].toString()} ikonComp={personen[1]} infoTekst={personen[2] as string} tittel={personen[3] as string} />
      })}
        
    </div>
    </>

  )
}

export default Arbeider