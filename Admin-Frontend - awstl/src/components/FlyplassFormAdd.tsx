import React, {useState} from 'react';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import { leggtilFlyplass} from "../util/flyplass";
import { useKeycloak } from "@react-keycloak/web";
import {useNavigate} from "react-router";


function FlyplassFormAdd(props: any) {

    const keycloak = useKeycloak()
    const navigate = useNavigate()

    const [icao, setIcao] = useState<string>("")
    const icaoChange = (e: any) =>{
        setIcao(e.target.value)
    }
    const [navn, setNavn] = useState<string>("")
    const navnChange = (e: any) =>{
        setNavn(e.target.value)
    }
    const [iata, setIata] = useState<string>("")
    const iataChange = (e: any) =>{
        setIata(e.target.value)
    }
    const [rwy, setRwy] = useState<string>("")
    const rwyChange = (e: any) =>{
        setRwy(e.target.value)
    }
    const [lat, setLat] = useState<string>("")
    const latChange = (e: any) =>{
        setLat(e.target.value)
    }
    const [lon, setLon] = useState<string>("")
    const lonChange = (e: any) =>{
        setLon(e.target.value)
    }
    const [altitude, setAltitude] = useState<string>("")
    const altitudeChange = (e: any) =>{
        setAltitude(e.target.value)
    }

    const [feil, setFeil] = useState<string>("")

    const click = async () => {

        const flyplass = {
            icao: icao,
            navn: navn,
            iata: iata,
            rwy: [{id: -1, rwy: rwy}],
            lat: lat,
            lon: lon,
            altitude: altitude
        }

        const value: any = await leggtilFlyplass(flyplass, keycloak.keycloak.token!!)

        if (value === 401) {
            setFeil("Du har ikke lov til å endre flyplass")
            return
        }

        navigate("/flyplass")
    }

    const avbryt = () => {
        navigate("/flyplass")
    }

    return (
        <Card style={{minWidth: 'fit-content', width: "50%", minHeight: 'fit-content'}} sx={{padding: 5}}>
            <CardContent style={{display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', alignItems: 'space-between'}} >
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly', gap:'1em', marginBottom: '1em'}}>
                    <TextField onChange={icaoChange} value={icao} id="standard-required-icao" label="Icao" variant="standard" />
                    <TextField onChange={navnChange} value={navn} id="standard-required-navn" label="Navn" variant="standard"/>
                    <TextField onChange={iataChange} value={iata} id="standard-required-iata" label="Iata" variant="standard" />
                    <TextField onChange={rwyChange} value={rwy} id="standard-required-rwy" label="Runway" variant="standard"/>
                    <TextField onChange={latChange} value={lat} id="standard-required-lat" label="Latitude" variant="standard" />
                    <TextField onChange={lonChange} value={lon} id="standard-required-lon" label="Longitude" variant="standard"/>
                    <TextField onChange={altitudeChange} value={altitude} id="standard-required-alt" label="Altitude" variant="standard" />
                </div>
                <div style={{display: "flex", alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display:'flex', gap: 1}}>
                        <Button onClick={click} style={{width: 'fit-content'}} variant="outlined">Lagre</Button>
                        <Button onClick={avbryt} style={{width: 'fit-content'}} variant="outlined">Avbryt</Button>
                    </div>
                    <Typography style={{color:'red'}} >{feil}</Typography>
                </div>

            </CardContent>
        </Card>
    );
}

export default FlyplassFormAdd;