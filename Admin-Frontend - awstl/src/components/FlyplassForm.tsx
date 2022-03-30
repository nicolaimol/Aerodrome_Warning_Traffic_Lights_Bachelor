import React, {useState} from 'react';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";

function FlyplassForm(props: any) {

    const navigate = useNavigate()

    useEffect(() => {
        const authentication = async () => {
            const status = await auth()

            if (status === 401) {
                navigate("/")
            }
        }

        authentication()
    })

    const [icao, setIcao] = useState<string>(props.flyplass.icao)
    const icaoChange = (e: any) =>{
        setIcao(e.target.value)
    }
    const [navn, setNavn] = useState<string>(props.flyplass.navn)
    const navnChange = (e: any) =>{
        setNavn(e.target.value)
    }
    const [iata, setIata] = useState<string>(props.flyplass.iata)
    const iataChange = (e: any) =>{
        setIata(e.target.value)
    }
    const [rwy, setRwy] = useState<string>(props.flyplass.rwy)
    const rwyChange = (e: any) =>{
        setRwy(e.target.value)
    }
    const [lat, setLat] = useState<string>(props.flyplass.lat)
    const latChange = (e: any) =>{
        setLat(e.target.value)
    }
    const [lon, setLon] = useState<string>(props.flyplass.lon)
    const lonChange = (e: any) =>{
        setLon(e.target.value)
    }
    const [altitude, setAltitude] = useState<string>(props.flyplass.altitude)
    const altitudeChange = (e: any) =>{
        setAltitude(e.target.value)
    }

    const click = () => {
        props.done()
    }

    return (
        <Card style={{minWidth: 'fit-content', width: "50%", minHeight: 'fit-content'}} sx={{padding: 5}}>
            <CardContent style={{display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', alignItems: 'space-between'}} >
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly', gap:'1em', marginBottom: '1em'}}>
                    <TextField onChange={icaoChange} value={icao} id="standard-required" label="Icao" variant="standard" />
                    <TextField onChange={navnChange} value={navn} id="standard-required" label="Navn" variant="standard"/>
                    <TextField onChange={iataChange} value={iata} id="standard-required" label="Iata" variant="standard" />
                    <TextField onChange={rwyChange} value={rwy} id="standard-required" label="Runway" variant="standard"/>
                    <TextField onChange={latChange} value={lat} id="standard-required" label="Latitude" variant="standard" />
                    <TextField onChange={lonChange} value={lon} id="standard-required" label="Longitude" variant="standard"/>
                    <TextField onChange={altitudeChange} value={altitude} id="standard-required" label="Altitude" variant="standard" />
                </div>
                <div style={{display: "flex", alignItems:'center', justifyContent: 'space-between'}}>
                    <Button onClick={click} style={{width: 'fit-content'}} variant="outlined">Lagre</Button>
                    <Typography style={{color:'red'}} >Her kommer feil</Typography>
                </div>

            </CardContent>
        </Card>
    );
}

export default FlyplassForm;