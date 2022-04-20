import { Container, List, ListItem, ListItemButton, Collapse, ListItemText } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useEffect } from 'react'


function Kart() {

    const [radarPos, setRadarPos] = React.useState('eastern_norway');
    const [open, setOpen] = React.useState(false);
    const [openTo, setOpenTo] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
      };

    const handleClickTo = () => {
        setOpenTo(true);
    };

    
    const steder = [{
        navn: 'Øst-Norge',
        pos: 'eastern_norway',
    },
    {
        navn: 'Sør-Norge',
        pos: 'southern_norway',
    },
    {
        navn: 'Nord-Norge',
        pos: 'northern_nordland',
    },
    {
        navn: 'Midtnorge',
        pos: 'central_norway',
    },
    {
        navn: 'Vest-Norge',
        pos: 'western_norway',
    },
    {
        navn: 'Sør-Nordland',
        pos: 'southern_nordland',
    },
    {
        navn: 'Nordvest-Norge',
        pos: 'northwestern_norway',
    },
    {
        navn: 'Sørøst-Norge',
        pos: 'southeastern_norway',
    },
    {
        navn: 'Finnmark',
        pos: 'finnmark',
    },
    {
        navn: 'Troms',
        pos: 'troms',
    },
    {
        navn: 'Nordland',
        pos: 'nordland',
    },
    {
        navn: 'Sørvest Norge',
        pos: 'southwestern_norway',
    },]

  return (
    <>
        <Container>
            <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
                <div>
                    <List sx={{ mb: 5}} style={{ width: 'fit-content', minWidth: '200px', backgroundColor: '#0090a8', color: '#FFF'}}>
                        <ListItemButton onClick={handleClickTo}>
                            <ListItemText primary="Sigchart" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary="Radar" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                    <Collapse in={open} timeout='auto' unmountOnExit>
                    <List >
                        {steder.map(sted => (
                            <ListItem key={sted.pos}>
                                <ListItemButton onClick={() => {setRadarPos(sted.pos); setOpenTo(false);}}>
                                    {sted.navn}
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List >
                    </Collapse>
                    </List>
                </div>
                
                <img style={{objectFit: 'contain', maxWidth: '100%', width: '50em'}} alt='radar' src={openTo ? 'https://api.met.no/weatherapi/sigcharts/2.0/norway' : `https://api.met.no/weatherapi/radar/2.0/?area=${radarPos}&content=animation&type=preciptype`} />
            </div>
            
        </Container>

    </>
  )
}

export default Kart