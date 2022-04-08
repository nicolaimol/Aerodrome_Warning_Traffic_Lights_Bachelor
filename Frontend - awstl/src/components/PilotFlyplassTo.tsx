import React, { useEffect, useState } from 'react'

import flyplasser from '../model/flyplasser';
import axios from 'axios';
import styles from '../style/Pilot.module.css'

// Material UI
import Typography from '@mui/material/Typography';
import { Autocomplete, Container, TextField } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../Actions';

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

function PilotFlyplassTo(props: any) {

  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<any>, value: any) => {
        if (value != null) {
          dispatch(allActions.toAirportAction.setToAirport(value));
          props.update({ navn: value.label, icao: value.icao, rwy: value.rwy})
        }
    }


  const airportList = useSelector((state: any) => state.airportList.value)
  const airport = useSelector((state: any) => state.airport.value)
  const toAirport = useSelector((state: any) => state.toAirport.value)

    const [flyplasserList, setFlyplasserList] = useState<any>([]); // Vi skal kunne lage en liste med alle flyplasser som passer til interfacet 'flyplasser'
    const [airportActive, setAirportActive] = useState<any>(null)


    useEffect(() => {
      if (airportList != undefined) {
        setFlyplasserList(airportList.map((it: any) => {
        return {label: it.navn, icao: it.icao, rwy: it.rwy}
      }))
      }
      
    }, [airportList])
  
    useEffect(() => {
      if (toAirport !== undefined) {
        setAirportActive(toAirport)
      }
        
    }, [toAirport])




    const classes = useStyles(); // bruker stylingen laget ovenfor
    
  




  return (
    <>
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', flexFlow: 'row wrap', alignItems: 'center'}}>
            
        {/** AutoComplete */}
            <div className={'AutoCompleteCustom'} style={{ paddingBottom: '2em', textAlign: 'left'}}>
                <div className={styles.fratil} >
                    <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center'}}>
                        <Typography sx={{ pr: 3, color: '#0090a8'}}>
                            Fra <b>{airport?.navn.split(",")[0]}</b> til
                        </Typography>

                        <Autocomplete
                            disablePortal
                            id="combo-box-flyplasser"
                            // Bruker styling laget ovenfor
                            classes={classes}
                            // redux endring av flyplasshåndtering
                            onChange={handleChange}
                            // setter flyplassen som valgt i listen
                            value={airportActive}
                            isOptionEqualToValue={(option: any, value: any) => option?.icao === value?.icao}
                            // Listen med valg settes inn her. For å gjøre det enklere sorteres den alfabetisk
                            options={flyplasserList.sort((a:any, b:any) => -b.label.localeCompare(a.label))}
                            // Listen grupperes også etter første bokstav
                            groupBy={(relevantFlyplassData) => relevantFlyplassData?.label.charAt(0).toString()}
                            sx={{ width: 300, backgroundColor: '#FFFFFF'}}
                            renderInput={(params) => <TextField {...params} label="Velg flyplass" />}
                        />
                    </div>
                </div>

          </div>
        </div>
        
    </div>
    </>
  )
}

export default PilotFlyplassTo