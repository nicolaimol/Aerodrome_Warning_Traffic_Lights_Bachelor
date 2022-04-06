import React from 'react'
import styles from '../style/Arbeiderkort.module.css'
// Interface
import arbeiderInfo from '../model/arbeiderInfo'

// Material UI
import { Card, CardContent, Typography, Box, Button } from '@mui/material'

import {Link} from 'react-router-dom'


function ArbeiderKort(props:arbeiderInfo) { {/** Tar inn props med interface til arbeiderinfo */}

  return (
    <Card sx={{ backgroundColor: '#0494ac'}} style={{display: 'flex'}}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                {/** Tittel */}
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <Typography sx={{ color: 'white' }} variant="h5">
                    {props.tittel}
                    </Typography>
                    {/** Undertittel */}
                    <Typography sx={{ mb: 10, color: "white"}}>
                        {props.infoTekst}
                    </Typography>
                </div>
                
                {/** Ikon */}
                <Box sx={{ mb: 10, color: 'white' }} textAlign='center'>
                    {props.ikonComp}
                </Box>
                {/** Knapp */}
                <Box textAlign='center'>
                <Link to={'/' + props.tittel.toLowerCase()}><Button className={styles.kortButton} variant="contained" >Sjekk</Button></Link>

                </Box>
            </CardContent>
        </Card>
  )
}

export default ArbeiderKort