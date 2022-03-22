import { TextField, Typography } from '@mui/material'
import React from 'react'



function PilotVelgDepArvl() {


  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', textAlign: 'center'}}>
        <Typography sx={{ mb: 3 }} variant='h5' color='primary'>
                Velg tidspunkt for avgang og ankomst
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap'}}>
                <TextField
                id="time"
                color= 'secondary'
                label="Avgang"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                sx={{ width: 150, mb: 5 }}
            />
            <TextField
                id="time"
                label="Ankomst"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                sx={{ width: 150, mb: 5 }}
            />
            </div>
    </div>
    
    
    </>
  )
}

export default PilotVelgDepArvl