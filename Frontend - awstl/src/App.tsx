import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Hjem from './pages/Hjem';
import Trafikklys from './pages/Trafikklys';
import Pilot from './pages/Pilot';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import allActions from './Actions';
import { Typography, Box } from '@mui/material';
import ReportGmailerrorredSharpIcon from '@mui/icons-material/ReportGmailerrorredSharp';

/***
 * Fargepalett!!!
 * 
 * Blå skrift: #0090a8
 * Bakgrunn: #dff2f6
 * Mørkeblå kort: #0494ac
 * Footer: #496c80
 */

 export const defaultVerdier = {
    airTempMin: -10,
    airTempMax: 3,
    precipitationMin: 0,
    precipitationMax: 1,
    windSpeedMin: 15,
    windSpeedMax: 25,
    windGustMin: 20,
    windGustMax: 30,
    probThunderMin: 20,
    probThunderMax: 40,
    humidityMin: 90,
    humidityMax: 98,
    fog: 50,
    //probIce: 0, ????????????????????????????
    crosswindMin: 7,
    crosswindMax: 15
};

function App() {

    const dispatch = useDispatch()

    let url = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        if (process.env.REACT_APP_URL_ENV == "prod") {
            url = "/api/terskel"
        }
        else {
            url = "http://localhost:8080/api/terskel"
        }
    } else {
        url = "/api/terskel"
    }

    let urlNowcast = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { // Uavhengig om det er local testing eller deployment så fungerer API kall
        if (process.env.REACT_APP_URL_ENV == "prod") {
            urlNowcast = '/api/nowcast?icao='
        } else {
            urlNowcast = 'http://localhost:8080/api/nowcast?icao='
        }
    } else {
        urlNowcast = '/api/nowcast?icao='
    }

    let urlLocfor = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { // Uavhengig om det er local testing eller deployment så fungerer API kall
        if (process.env.REACT_APP_URL_ENV == "prod") {
            urlLocfor = '/api/locationforecast?icao='
        } else {
            urlLocfor = 'http://localhost:8080/api/locationforecast?icao='
        }
    } else {
        urlLocfor = '/api/locationforecast?icao='
    }

    const [error, setError] = useState(false)

    useEffect(() => {

        axios.get(url)
            .then((response: any) => {
                const flyplass = response.data.flyplass
                delete response.data.flyplass

                dispatch(allActions.airportAction.setAirport(flyplass))
                dispatch(allActions.terskelActions.setTerskel(response.data))
            })
            .catch((error: any) => {

                if (error.response.status === 502) {
                    setError(true)
                } else {
                    dispatch(allActions.airportAction.setAirport({
                        icao: "ENDU",
                        navn: "Bardufoss lufthavn",
                        rwy: "11/28"
                    }))
                }

                dispatch(allActions.terskelActions.setTerskel(defaultVerdier))
            })


    }, [])


    const nowcast = useSelector((state: any) => state.nowcast.value)
    const airport = useSelector((state: any) => state.airport.value)

    const [active, setActive] = useState<any>(null)

    useEffect(() => {
        if (airport != undefined) {
            axios.get(`${urlNowcast}${airport.icao}`) // Henter værdata for 3 flyplasser + en egendefinert
                .then((response) => {
                    dispatch(allActions.nowcastAction.setNowcast(response.data))
                   
                })

            axios.get(`${urlLocfor}${airport.icao}`)
                .then((response:any) => {
                    dispatch(allActions.weatherActions.setWeather(response))
                }) 

            console.log("henter fra server")
        }

    

        /*
        if (active) {
            clearInterval(active)
            setActive(null)
        }


        const interval = setInterval(() => {
            console.log(airport)
        }, 10000)

        setActive(interval)

         */



        //return () => clearInterval(active)


    },[airport])

    let ikonpath:string = "/weatherIcons/";
    ikonpath += nowcast?.nowcasts[0].properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data

    let temperatureColor = nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'; // Er det pluss eller minus grader? farge avhenger av dette


    return (
    <div className="outer" style={{display: 'flex', minHeight: "100vh", flexDirection: "column", position: "relative"}}>
      <Navbar />


            { !error &&
                <div style={{position: "fixed", display: 'flex', right: '.5em', top: '1.5em', width: 'fit-content'}}>
                    <Typography>
                        {airport != undefined &&
                            <span style={{color: "#0090a8"}}>{airport.navn}</span>
                        }
                    </Typography>
                    {nowcast != undefined &&

                        <>
                            <Box style={{ display: 'flex', justifyContent: 'center'}}>
                                <img style={{height: '20px', margin: "0 5px"}} src={ikonpath} alt={nowcast?.nowcasts[0].properties.timeseries[0].data.next_1_hours.summary.symbol_code} />
                            </Box>
                            <Typography sx={{color: `${temperatureColor}`}}>
                                {nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature}°C
                            </Typography>
                        </>

                    }
                </div>
            }
            { error &&
                <div style={{
                    zIndex: 100,
                    backgroundColor: 'yellow',
                    position: "fixed",
                    display: 'flex',

                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    top: "50%",

                    /*
                    right: '1.5em',
                    top: '1.5em',

                     */
                    padding: '1em',
                    borderRadius: '1em',
                    border: 'solid hsla(0, 0%, 100%, 0.6 ) 3px'}}>
                    <Typography variant="h6" style={{color: "gray", display:'flex', alignItems:'center', gap: '.5em'}}>
                        <ReportGmailerrorredSharpIcon />Tjenesten er ikke tilgjengelig
                    </Typography>
                </div>

            }




      <div style={{flexGrow: 1}}>
        <Routes>
            {/*

                <Route path="/list" element={<Testlist />} />
                <Route path="/input" element={<Testinputs />} />
                <Route path="/  " element={<ShowInput />} />

            */}

          <Route path="/flygeleder" element={<Trafikklys />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/" element={<Hjem />} />
        </Routes>
      </div>
        
      
      

      <Footer />

    </div>

      
  );
}

export default App;

