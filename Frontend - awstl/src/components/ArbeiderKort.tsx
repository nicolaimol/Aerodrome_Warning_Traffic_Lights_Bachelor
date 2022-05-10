import React from 'react'
import styles from '../style/Arbeiderkort.module.css'
import arbeiderInfo from '../model/arbeiderInfo'
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import {Link} from 'react-router-dom'


function ArbeiderKort(props:arbeiderInfo) { {/** Tar inn props med interface til arbeiderinfo */}

  return (
      
        <Card className={styles.kortButton} sx={{ backgroundColor: '#0494ac'}} style={{display: 'flex', flexGrow: 1}}>
            <Link style={{ width: '100%' }} to={'/' + props.tittel.toLowerCase()}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
                </CardContent>
            </Link>
        </Card>
    
  )
}

export default ArbeiderKort