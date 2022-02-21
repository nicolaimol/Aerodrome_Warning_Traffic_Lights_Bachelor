import * as React from 'react';
import { useState, useEffect } from 'react';

// API kall
import axios from 'axios';

// Redux
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../Actions'

// Interface
import flyplasser from '../model/flyplasser';

// Material UI
import Typography from '@mui/material/Typography';
import { Autocomplete, Container, TextField } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({ // Lager style til AutoComplete komponent 
  root: {
    
    '& .MuiInputLabel-outlined': { color: '#0090a8' } // Tekstfarge
  },
  inputRoot: {
    color: "#0090a8", // Farge etter input

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0090a8" // Farge på kant rundt input feltet
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0494ac" // Farge på kant rundt input feltet ved hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#496c80" // Farge på kant rundt input feltet ved fokus
    }
  }
}));

export default function Banner() {

  const [flyplasserList, setFlyplasserList] = useState<flyplasser[]>([]);

  const classes = useStyles();

  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<any>, value: any) => {
    console.log(value)
    if (value !== null) {
      dispatch(allActions.airportAction.setAirport({icao: value.icao, navn: value.label}))
    }
  }

  let url = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8080/api/airport'
} else {
    url = '/api/airport'
}

  const airportRedux = useSelector((state:any) => state.airport.value)

  useEffect(() => {

    console.log("update")
 
      axios.get(url)
      .then((response) => {
        setFlyplasserList(response.data);
      })
      
  },[])

  let relevantFlyplassData = [];

  for (let i = 0; i < flyplasserList.length; i++){
    const nyPush = {label: flyplasserList[i].navn, icao: flyplasserList[i].icao};
    relevantFlyplassData.push(nyPush);
  }

  return (
    <>
    <div style={{ minHeight: '50vh', width: '100%', backgroundColor: '#dff2f6'}}>
      <Container sx={{ color: '#0090a8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'center'}}>
          <Typography style={{ maxWidth: '60%'}} sx={{ pt: 5}} component="h1" variant="h3" color="inherit" gutterBottom>
            Aerodrome Warning Traffic Light System
          </Typography>
          <div className='AutoCompleteCustom' style={{ paddingBottom: '2em' }}>
            <Autocomplete
            disablePortal
            id="combo-box-flyplasser"
            classes={classes}
            onChange={handleChange}
            options={relevantFlyplassData.sort((a, b) => -b.label.localeCompare(a.label))}
            groupBy={(relevantFlyplassData) => relevantFlyplassData.label.charAt(0).toString()}
            sx={{ width: 300, backgroundColor: '#FFFFFF'}}
            renderInput={(params) => <TextField {...params} label="Velg flyplass" />}
          />
          </div>
          
        </div>

      <Typography sx={{ pb: 5}} variant="h5" color="inherit" paragraph>
        Dette er en tjeneste for å fortelle om det er trygt med aktivitet på en flyplass i Norge.
      </Typography>
    </Container>
    </div>
    
    </>
  );
}
