import { AppBar, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import TrafikklysBox from '../components/TrafikklysBox'
import VisSatteTerskelverdier from '../components/VisSatteTerskelverdier'

import Tidslinje from '../components/Tidslinje'
import GrafikkTrafikklys from '../components/GrafikkTrafikklys'
import DrawerTerskelverdier from '../components/DrawerTerskelverdier'

function Trafikklys() {
  const defaultVerdier = {
    airTemp: 0,
    precipitationAmmount: 20,
    windSpeed: 30,
    windGust: 40,
    probThunder: 0,
    humidity: 2,
    fog: 40,
    probIce: 20,
    crosswind: 50,
  };

  const terskel = useSelector((state: any) => state.terskel.value)




  return (
    <>
    <Container>

    <Typography sx={{ color: '#0090a8', fontSize: 40, textAlign: 'center', mt: 5}}>
          Flygeleder
        </Typography>
        <Divider sx={{ mb: 5 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'center'}}>
        <VisSatteTerskelverdier
            terskel={terskel !== undefined ? terskel : defaultVerdier}
            /*
              airTemp={0}
              precipitationAmmount={20}
              windSpeed={30}
                    windDirection={180}
              windGust={40}
              probThunder={50}
              dewpoint={4}
              humidity={2}
              fog={40}

              probIce={20}
              crosswind={50}
              */
      />
        <TrafikklysBox farge='red' />
      </div>
      

      <div>
            <Typography sx={{ color: '#0090a8', fontSize: 30, textAlign: 'center'}}>
                Tidslinje for de neste 72 timer
            </Typography>
            <Divider sx={{ mb: 5}} />
        <Tidslinje />
      </div>
    </Container>
      <GrafikkTrafikklys />
    </>
  )
}

export default Trafikklys