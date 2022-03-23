import React from 'react'

// Interface
import arbeiderInfo from '../model/arbeiderInfo'

// Material UI
import { Card, CardContent, Typography, Box, Button } from '@mui/material'


function ArbeiderKort(props:arbeiderInfo) { {/** Tar inn props med interface til arbeiderinfo */}

  return (
    <Card sx={{ backgroundColor: '#0494ac'}}>
            <CardContent>
                {/** Tittel */}
                <Typography sx={{ color: 'white' }} variant="h5">
                    {props.arbeider}
                </Typography>
                {/** Undertittel */}
                <Typography sx={{ mb: 10, color: "white"}}>
                    Her ser du mest relevant informasjon om du er {props.arbeider}
                </Typography>
                {/** Ikon */}
                <Box sx={{ mb: 10, color: 'white' }} textAlign='center'>
                    {props.ikonComp}
                </Box>
                {/** Knapp */}
                <Box textAlign='center'>
                    <Button variant="contained" sx={{background: 'white', color: '#0090a8' }} >Sjekk</Button>
                </Box>
            </CardContent>
        </Card>
  )
}

export default ArbeiderKort