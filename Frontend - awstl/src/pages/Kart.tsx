import { Container, List, ListItem, ListItemButton, Collapse, ListItemText, Slider, Divider, Typography, Button } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { generateSimpleStyle} from '../util/sliderStyleUtil'


function Kart() {

    const startDato = new Date()

    const [radarPos, setRadarPos] = React.useState('eastern_norway');
    const [radarPosNorsk, setRadarPosNorsk] = React.useState('Øst-Norge');
    const [open, setOpen] = React.useState(false);
    const [openTo, setOpenTo] = React.useState(false);
    const [sliderBool, setSliderBool] = React.useState(false);
    const [dato, setDato] = React.useState<Date>(new Date(Math.round(startDato.getTime() / (1000*60*5))* (1000*60*5)));
    const [sliderUrl, setSliderUrl] = React.useState<string>("");
    const [sliderValue, setSliderValue] = React.useState<number>(180);
    const [disabledGIF, setDisabledGIF] = React.useState<boolean>(true);

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

    const sliderMarksLabel = [
            {
              value: 170,
              label: 'Siste',
            },
            {
                value: 150,
                label: '-30 min',
            },
            {
                value: 120,
                label: '-1 t',
            },
            {
                value: 90,
                label: '-1½ t',
            },
            {
                value: 60,
                label: '-2 t',
            },
            {
                value: 30,
                label: '-2½ t',
            },
            {
                value: 0,
                label: '-3 t',
            },
    ];

    const sliderMarksLabelMobile = [
            {
              value: 170,
              label: 'Siste',
            },
            {
                value: 90,
                label: '-1½ t',
            },
            {
                value: 0,
                label: '-3 t',
            },
    ];

    const sliderMarks = [
            {
              value: 170,
              label: '10 minutt siden',
            },
            {
              value: 165,
              label: '15 minutt siden',
            },
            {
                value: 160,
                label: '20 minutt siden',
            },
            {
                value: 155,
                label: '25 minutt siden',
            },
            {
                value: 150,
                label: '30 minutt siden',
            },
            {
                value: 145,
                label: '35 minutt siden',
            },
            {
                value: 140,
                label: '40 minutt siden',
            },
            {
                value: 135,
                label: '45 minutt siden',
            },
            {
                value: 130,
                label: '50 minutt siden',
            },
            {
                value: 125,
                label: '55 minutt siden',
            },
            {
                value: 120,
                label: '1 time siden',
            },
            {
                value: 115,
                label: '1 time 5 minutt siden',
            },
            {
                value: 110,
                label: '1 time 10 minutt siden',
            },
            {
                value: 105,
                label: '1 time 15 minutt siden',
            },
            {
                value: 100,
                label: '1 time 20 minutt siden',
            },
            {
                value: 95,
                label: '1 time 25 minutt siden',
            },
            {
                value: 90,
                label: '1 time 30 minutt siden',
            },
            {
                value: 85,
                label: '1 time 35 minutt siden',
            },
            {
                value: 80,
                label: '1 time 40 minutt siden',
            },
            {
                value: 75,
                label: '1 time 45 minutt siden',
            },
            {
                value: 70,
                label: '1 time 50 minutt siden',
            },
            {
                value: 65,
                label: '1 time 55 minutt siden',
            },
            {
                value: 60,
                label: '2 timer siden',
            },
            {
                value: 55,
                label: '2 timer 5 minutt siden',
            },
            {
                value: 50,
                label: '2 timer 10 minutt siden',
            },
            {
                value: 45,
                label: '2 timer 15 minutt siden',
            },
            {
                value: 40,
                label: '2 timer 20 minutt siden',
            },
            {
                value: 35,
                label: '2 timer 25 minutt siden',
            },
            {
                value: 30,
                label: '2 timer 30 minutt siden',
            },
            {
                value: 25,
                label: '2 timer 35 minutt siden',
            },
            {
                value: 20,
                label: '2 timer 40 minutt siden',
            },
            {
                value: 15,
                label: '2 timer 45 minutt siden',
            },
            {
                value: 10,
                label: '2 timer 50 minutt siden',
            },
            {
                value: 5,
                label: '2 timer 55 minutt siden',
            },
            {
                value: 0,
                label: '3 timer siden',
            },
    ];

    const handleClick = () => {
        setOpen(!open);
      };

    const handleClickTo = () => {
        setOpenTo(true);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const handleSliderChangeCommit = (event: Event | SyntheticEvent, newValue: number | number[]) => {
        const date = new Date(Math.round(new Date().getTime() / (1000*60*5))* (1000*60*5))
        date.setMinutes(date.getMinutes() - (180 - (newValue as number)))

        setDato(date);

    }

    const disabledGIFHandler = () => {
        setDisabledGIF(!disabledGIF);
    };

    const formatValue = sliderMarks.find(mark => mark.value === sliderValue);

    useEffect(() => {
        let month, day, hour, minute;

        dato.setMinutes(dato.getMinutes() - 10);
        //dato.setMonth(dato.getMonth() + 1);

        if (dato.getUTCMonth() < 10) {
            month = '0' + (dato.getUTCMonth() + 1);
        } else {month = (dato.getUTCMonth() + 1);}

        if (dato.getUTCDate() < 10) {
            day = '0' + dato.getUTCDate();
        } else {day = dato.getUTCDate();}

        if (dato.getUTCHours() < 10) {
            hour = '0' + dato.getUTCHours();
        } else {hour = dato.getUTCHours();}

        if ((dato.getUTCMinutes()) < 10) {
            minute = '0' + dato.getUTCMinutes();
        } else {minute = dato.getUTCMinutes();}

        setSliderUrl(`https://api.met.no/weatherapi/radar/2.0/?type=preciptype&area=${radarPos}&time=${dato.getUTCFullYear()}-${month}-${day}T${hour}:${minute}:00Z`);

        (window.innerWidth > 720) ? setSliderBool(false) : setSliderBool(true);

        window.addEventListener('resize', () => {
            (window.innerWidth > 720) ? setSliderBool(false) : setSliderBool(true);
        });

        return () => window.removeEventListener('resize', () => {});


    }, [])

    useEffect(() => {
        let month, day, hour, minute;


            if (dato.getUTCMonth() < 10) {
                month = '0' + (dato.getUTCMonth() + 1);
            } else {month = (dato.getUTCMonth() + 1);}
        
            if (dato.getUTCDate() < 10) {
                day = '0' + dato.getUTCDate();
            } else {day = dato.getUTCDate();}
        
            if (dato.getUTCHours() < 10) {
                hour = '0' + dato.getUTCHours();
            } else {hour = dato.getUTCHours();}
        
            if ((dato.getUTCMinutes()) < 10) {
                minute = '0' + dato.getUTCMinutes();
            } else {minute = dato.getUTCMinutes();}

            setSliderUrl(`https://api.met.no/weatherapi/radar/2.0/?type=preciptype&area=${radarPos}&time=${dato.getUTCFullYear()}-${month}-${day}T${hour}:${minute}:00Z`);


    },[dato, radarPos]);

    
  return (
    <>
        <Container>
            <Typography sx={{ color: '#0090a8', fontSize: 40, textAlign: 'center', mt: 5}}>
                Kart - {!openTo ? radarPosNorsk: "Sigchart"}
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
                <div>
                    <List sx={{ mb: 5}} style={{ width: 'fit-content', minWidth: '250px', backgroundColor: '#0090a8', color: '#FFF'}}>
                        <ListItemButton onClick={handleClickTo}>
                            <ListItemText primary="Sigchart" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary="Værradar" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                    <Collapse in={open} timeout='auto' unmountOnExit>
                    <List >
                        {steder.map(sted => (
                            <ListItem key={sted.pos}>
                                <ListItemButton onClick={() => {setRadarPos(sted.pos); setRadarPosNorsk(sted.navn); setOpenTo(false);}}>
                                    {sted.navn}
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List >
                    </Collapse>
                    </List>
                </div>
                <img style={{objectFit: 'contain', maxWidth: '100%', width: '50em'}} alt='radar' src={openTo ? 'https://api.met.no/weatherapi/sigcharts/2.0/norway' : disabledGIF ? sliderUrl : `https://api.met.no/weatherapi/radar/2.0/?area=${radarPos}&content=animation&type=preciptype`} />
                <div style={{display:"flex", flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: 'center', gap: '1em', justifyContent: 'center', marginTop: '2em' }}>
                            <Button style={{width: '9em', height: '4em', color:'#FFFFFF', backgroundColor:'#0494ac' }} onClick={disabledGIFHandler}>
                                {"Vis som " + (disabledGIF ? 'animasjon' : 'statisk bilde')}
                            </Button>

                    <Slider
                        aria-label="Select time"
                        defaultValue={170}
                        //getAriaValueText={}
                        classes={generateSimpleStyle()}
                        value={sliderValue}
                        disabled={!disabledGIF || openTo}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderChangeCommit}
                        step={5}
                        marks={sliderBool ? sliderMarksLabelMobile : sliderMarksLabel}
                        valueLabelFormat={(value: number) => formatValue?.label}
                        min={0}
                        max={170}
                        valueLabelDisplay="auto"
                        style={{maxWidth: '80%'}}
                        sx={{ mb: 5 }}
                    />
                </div>
            </div>
        </Container>
    </>
  )
}

export default Kart