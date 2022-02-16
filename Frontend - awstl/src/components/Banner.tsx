import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Autocomplete, Container, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import flyplasser from '../model/flyplasser';

import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      
      //color: '#0090a8'
    },

    '& .MuiInputLabel-outlined': { color: '#0090a8' }
  },
  inputRoot: {
    color: "#0090a8",

    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0090a8"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0494ac"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#496c80"
    }
  }
}));

export default function Banner() {

  const [flyplasserList, setFlyplasserList] = useState<flyplasser[]>([]);

  const classes = useStyles();

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
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}>
          <Typography sx={{ pt: 5}} component="h1" variant="h3" color="inherit" gutterBottom>
            Aerodrome Warning Traffic Light System
          </Typography>
          <div className='AutoCompleteCustom'>
            <Autocomplete
            disablePortal
            id="combo-box-flyplasser"
            classes={classes}
            //onChange={(event, value) => }
            options={relevantFlyplassData.sort((a, b) => -b.label.charAt(0).toString().localeCompare(a.label.charAt(0).toString()))}
            groupBy={(relevantFlyplassData) => relevantFlyplassData.label.charAt(0).toString()}
            sx={{ width: 300, backgroundColor: '#FFFFFF'}}
            renderInput={(params) => <TextField {...params} style={{ backgroundColor: "pink !important" }} label="Velg flyplass" />}
          />
          </div>
          
        </div>

      <Typography variant="h5" color="inherit" paragraph>
        Dette er en tjeneste for å fortelle om det er trygt med aktivitet på en flyplass i Norge.
      </Typography>
    </Container>
    </div>
    
    </>
  );
}