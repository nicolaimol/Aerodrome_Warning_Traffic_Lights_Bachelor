import { Typography, Paper, Box } from '@mui/material'
import { borderRadius } from '@mui/system'
import React, {useEffect} from 'react'
import trafikklysFarge from '../model/trafikklysFarge';

function TrafikklysBox(props: trafikklysFarge) {

    const [mobil, setMobil] = React.useState(false);

    useEffect(() => {

        (window.innerWidth > 400) ? setMobil(false) : setMobil(true);

        window.addEventListener('resize', () => {
            (window.innerWidth > 400) ? setMobil(false) : setMobil(true);
        });

        return () => window.removeEventListener('resize', () => {});
    }, []);

    const greenLight =
            <>
                <Typography variant='h6' gutterBottom>
                    Akkurat nå er det grønt lys
                </Typography>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'red', height: '100px', width: '100px', opacity: '50%', filter: 'grayscale(100%)'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'yellow', height: '100px', width: '100px', filter: 'grayscale(100%)'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'green', height: '100px', width: '100px', boxShadow: '0 0 20px green'}}>

                </Box>
            </>

    const yellowLight =
        <>
                <Typography variant='h6' gutterBottom>
                    Akkurat nå er det gult lys
                </Typography>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'red', height: '100px', width: '100px', opacity: '50%', filter: 'grayscale(100%)'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'yellow', height: '100px', width: '100px', boxShadow: '0 0 20px yellow'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'green', height: '100px', width: '100px', opacity: '50%', filter: 'grayscale(100%)'}}>

                </Box>
        </>

    const redLight =
                <>
                <Typography variant='h6' gutterBottom>
                    Akkurat nå er det rødt lys
                </Typography>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'red', height: '100px', width: '100px', boxShadow: '0 0 20px red'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'yellow', height: '100px', width: '100px', filter: 'grayscale(100%)'}}>

                </Box>
                <Box sx={{ mb: 5}} style={{borderRadius: '50%', backgroundColor: 'green', height: '100px', width: '100px', opacity: '50%', filter: 'grayscale(100%)'}}>

                </Box>
            </>



    let aktivFarge;

  if (props.farge === 'green'){
    aktivFarge = greenLight;
  } else if (props.farge === 'yellow') {
    aktivFarge = yellowLight;
  } else {
    aktivFarge = redLight;
  }

  return (
      <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column wrap', width: '40%', color: '#0090a8', minWidth: '270px'}}>
          <Typography style={{textAlign: 'center'}} variant={mobil ? "h5" : "h4"} gutterBottom>
              Trafikklys
          </Typography>
          <Paper elevation={3} sx={{ mb: 5}} style={{ color: '#0090a8', minHeight: '20vh', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center'}} >
    {aktivFarge}
          </Paper>
      </div>
  )
}

export default TrafikklysBox