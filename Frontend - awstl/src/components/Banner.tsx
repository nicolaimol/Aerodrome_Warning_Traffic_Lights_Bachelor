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


  const classes = useStyles(); // bruker stylingen laget ovenfor

  const terskel = useSelector((state:any) => state.terskel.value)
  const urlTerskel = "/api/terskel"

  const dispatch = useDispatch(); // statemanager
  const handleChange = (event: React.ChangeEvent<any>, value: any) => {
    if (value !== null) {
      dispatch(allActions.airportAction.setAirport({icao: value.icao, navn: value.label, rwy: value.rwy}))
      const obj = terskel
      obj.flyplass = {icao: value.icao, navn: value.label}
      axios.post(urlTerskel, obj)
          .then((response:any) => {

          })
          .catch((error: any) => {
            console.log(error)
          })
    }
  }



  const airportRedux = useSelector((state:any) => state.airport.value)
  const airportList = useSelector((state:any) => state.airportList.value)
  const [listAirport, setListAirport] = useState([])
  const [selectedAirport, setSelectedAirport] = useState<any>(null)

  useEffect(() => {
    if (airportRedux != null) {
      setSelectedAirport({
        label: airportRedux?.navn,
        icao: airportRedux?.icao,
        rwy: airportRedux?.rwy
      })
    }
    else {
      setSelectedAirport(null)
    }
  }, [airportRedux])

  useEffect(() => {
    if (airportList !== undefined) {

      setListAirport(airportList.map((it:any) => {
        return {
          label: it.navn,
          icao: it.icao,
          rwy: it.rwy
        }
      }))
    }
  },[airportList])

  const [bannerMobileBool, setBannerMobileBool] = React.useState(false); 

  useEffect(() => {

  (window.innerWidth > 400) ? setBannerMobileBool(false) : setBannerMobileBool(true);

        window.addEventListener('resize', () => {
            (window.innerWidth > 400) ? setBannerMobileBool(false) : setBannerMobileBool(true);
        });

        return () => window.removeEventListener('resize', () => {});
    }, []);

  // @ts-ignore
  return (
    <>
    <div style={{ minHeight: 'fit-content', width: '100%', backgroundColor: '#dff2f6'}}> 
      <Container sx={{ color: '#0090a8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', alignItems: 'center'}}> {/** Denne div-en inneholder tittel og AutoComplete komponent */}
        {/** Tittel */}
          <Typography style={{ maxWidth: '60%', textAlign: 'left'}} sx={{ pt: 5}} component="h1" variant={bannerMobileBool ? 'h4' : 'h3'} color="inherit" gutterBottom>
            Aerodrome Warning Traffic Light System (prototype*)
          </Typography>
          
          {/** AutoComplete */}
          <div className='AutoCompleteCustom' style={{ paddingBottom: '2em' }}>
            <Autocomplete
            disablePortal
            id="combo-box-flyplasser"
            // Bruker styling laget ovenfor
            classes={classes}
            // redux endring av flyplasshåndtering
            onChange={handleChange}
            // setter flyplassen som valgt i listen
            value={selectedAirport}
            isOptionEqualToValue={(option, value) => option.icao === value.icao}
            // Listen med valg settes inn her. For å gjøre det enklere sorteres den alfabetisk
            options={listAirport.sort((a:any, b:any) => -b.label.localeCompare(a.label))}
            // Listen grupperes også etter første bokstav
            groupBy={(relevantFlyplassData) => relevantFlyplassData.label.charAt(0).toString()}
            sx={{ width: 280, backgroundColor: '#FFFFFF'}}
            renderInput={(params) => <TextField {...params} label="Velg flyplass"
            // @ts-ignore
            />}
          />
          </div>
          
        </div>
        <p>*Dette er en tjeneste som er en prototype og ikke operasjonell</p>

        {/** Beskrivelse av nettsiden */}

      <Typography sx={{ pb: 5}} style={{textAlign: 'center'}} variant="h5" color="inherit" paragraph>
        Dette er en tjeneste for å fortelle om det er trygt med aktivitet på en flyplass i Norge.
      </Typography>
    </Container>
    </div>
    
    </>
  );
}
