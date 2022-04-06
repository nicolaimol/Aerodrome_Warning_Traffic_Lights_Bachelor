import React from 'react';
import {useLocation} from 'react-router-dom'
import {Typography} from '@mui/material'

function Error(props: any) {

    const location = useLocation();

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '2em'}}>

            <Typography variant="h5">Her har det skjedd en feil</Typography>
            <Typography>Siden du prøver å nå er ikke tilgjengelig for øyeblikket</Typography>
            <Typography><code>{location.pathname}</code></Typography>

        </div>
    );
}

export default Error;