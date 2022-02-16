import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import MetLogo from '../media/met-logo.svg';
import { url } from 'inspector';
import { Container } from '@mui/material';



export default function Banner() {

  return (
    <>
    <div style={{ height: '50vh', width: '100%', backgroundColor: '#dff2f6'}}>
      <Container sx={{ color: '#0090a8' }}>
      <Typography sx={{ pt: 5}} component="h1" variant="h3" color="inherit" gutterBottom>
        Aerodrome Warning Traffic Light System
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        Dette er en tjeneste for å fortelle om det er trygt med aktivitet på en flyplass i Norge.
      </Typography>
    </Container>
    </div>
    
    </>
  );
}