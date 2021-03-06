import React, {useState} from 'react';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import { oppdaterFlyplass} from "../util/flyplass";
import { useKeycloak } from "@react-keycloak/web";

function FlyplassForm(props: any) {

    const keycloak = useKeycloak()

    const [icao, setIcao] = useState<string>(props.flyplass.icao)

    const [navn, setNavn] = useState<string>(props.flyplass.navn)
    const navnChange = (e: any) =>{
        setNavn(e.target.value)
    }
    const [iata, setIata] = useState<string>(props.flyplass.iata)
    const iataChange = (e: any) =>{
        setIata(e.target.value)
    }
    const [rwy, setRwy] = useState<any[]>(props.flyplass.rwy)
    const rwyChange = (e: any, id: number) =>{
        console.log(e.target)
        setRwy((old: any) => {
            for (const it of old) {
                if (it.id === id) {
                    it.rwy = e.target.value
                }
            }

            return [...old];
        })

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

    const [feil, setFeil] = useState<string>("")

    const click = async () => {

        const flyplass = {
            icao: icao,
            navn: navn,
            iata: iata,
            rwy: rwy,
            lat: lat,
            lon: lon,
            altitude: altitude
        }

        const value: any = await oppdaterFlyplass(flyplass, keycloak.keycloak.token!!)

        if (value === 401) {
            setFeil("Du har ikke lov til å endre flyplass")
            return
        }

        if (value !== 200) {
            setFeil("Noe gikk galt")
            return
        }

        props.done(flyplass)
    }

    const avbryt = () => {
        props.cancel()
    }

    return (
        <Card style={{minWidth: 'fit-content', width: "50%", minHeight: 'fit-content'}} sx={{padding: 5}}>
            <CardContent style={{display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', alignItems: 'space-between'}} >
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly', gap:'1em', marginBottom: '1em'}}>
                    <TextField disabled value={icao} id="standard-required-icao" label="Icao" variant="standard" />
                    <TextField onChange={navnChange} value={navn} id="standard-required-navn" label="Navn" variant="standard"/>
                    <TextField onChange={iataChange} value={iata} id="standard-required-iata" label="Iata" variant="standard" />
                    {
                        rwy.map((it: any) => {
                            return <TextField key={it.id} onChange={(e) => rwyChange(e, it.id)} value={it.rwy} id="standard-required-rwy" label="Runway" variant="standard"/>
                        })
                    }

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

export default FlyplassForm;