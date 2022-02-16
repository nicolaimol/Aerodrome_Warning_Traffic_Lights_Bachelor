import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Autocomplete, Container, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import flyplasser from '../model/flyplasser'



export default function Banner() {

  const [flyplasserList, setFlyplasserList] = useState<flyplasser[]>([]);

  useEffect(() => {
      axios.get('http://localhost:8080/api/airport')
      .then((response) => {
        setFlyplasserList(response.data);
      })
  },[])

  console.log(flyplasserList);

  let relevantFlyplassData = [];

  for (let i = 0; i < flyplasserList.length; i++){
    const nyPush = {label: flyplasserList[i].navn, icao: flyplasserList[i].icao};
    relevantFlyplassData.push(nyPush);
  }

  return (
    <>
    <div style={{ height: '50vh', width: '100%', backgroundColor: '#dff2f6'}}>
      <Container sx={{ color: '#0090a8' }}>
        <div>
          <Typography sx={{ pt: 5}} component="h1" variant="h3" color="inherit" gutterBottom>
            Aerodrome Warning Traffic Light System
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-flyplasser"
            options={relevantFlyplassData}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Flyplass" />}
          />
        </div>

      <Typography variant="h5" color="inherit" paragraph>
        Dette er en tjeneste for å fortelle om det er trygt med aktivitet på en flyplass i Norge.
      </Typography>
    </Container>
    </div>
    
    </>
  );
}