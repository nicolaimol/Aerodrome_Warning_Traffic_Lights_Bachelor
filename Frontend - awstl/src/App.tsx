import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Hjem from './pages/Hjem';
import Trafikklys from './pages/Trafikklys';
import Pilot from './pages/Pilot';
import Kart from './pages/Kart';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import allActions from './Actions';
import { Typography, Box, Paper } from '@mui/material';
import ReportGmailerrorredSharpIcon from '@mui/icons-material/ReportGmailerrorredSharp';
import Error from './pages/Error'
import styles from './style/App.module.css'


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
    airTempActive: true,

    precipitationMin: 0,
    precipitationMax: 1,
    precipitationActive: true,

    windSpeedMin: 15,
    windSpeedMax: 25,
    windSpeedActive: true,

    windGustMin: 20,
    windGustMax: 30,
    windGustActive: true,

    probThunderMin: 20,
    probThunderMax: 40,
    probThunderActive: true,
    
    humidityMin: 90,
    humidityMax: 98,
    humidityActive: true,

    crosswindMin: 7,
    crosswindMax: 15,
    crosswindActive: true
};

function App() {

    const dispatch = useDispatch()

    let url = ""
    let urlNowcast = ""
    let urlLocfor = ""
    let urlAirport = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        if (process.env.REACT_APP_URL_ENV === "prod") {
            url = "/api/terskel"
            urlNowcast = '/api/nowcast?icao='
            urlLocfor = '/api/locationforecast?icao='
            urlAirport = '/api/airport'
        }
        else {
            url = "http://localhost:8080/api/terskel"
            urlNowcast = 'http://localhost:8080/api/nowcast?icao='
            urlLocfor = 'http://localhost:8080/api/locationforecast?icao='
            urlAirport = 'http://localhost:8080/api/airport'
        }
    } else {
        url = "/api/terskel"
        urlNowcast = '/api/nowcast?icao='
        urlLocfor = '/api/locationforecast?icao='
        urlAirport = '/api/airport'
    }

    const [error, setError] = useState(false)
    const [activeAirport, setActiveAirport] = useState<any>({})
    const nowcast = useSelector((state: any) => state.nowcast.value)
    const airport = useSelector((state: any) => state.airport.value)

    let ikonpath:string = "/weatherIcons/";
    ikonpath += nowcast?.nowcasts[0].properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
    let temperatureColor = nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'; // Er det pluss eller minus grader? farge avhenger av dette


    useEffect(() => {

        axios.get(urlAirport)
            .then((response: any) => {
                dispatch(allActions.airportListAction.setAirportList(response.data))
            })

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

                    const standard = {
                        flyplass: {
                            icao: "ENGM"
                        },
                        ...defaultVerdier
                    }
                    axios.post(url, standard)
                        .then((response: any) => {
                            
                        })

                    dispatch(allActions.airportAction.setAirport({
                        icao: "ENGM",
                        navn: "Oslo lufthavn, Gardermoen",
                        rwy: [{rwy: "01/19"}]
                    }))
                }

                dispatch(allActions.terskelActions.setTerskel(defaultVerdier))
            })


        const interval = setInterval(() => {
            setActiveAirport((old: any) => {

                axios.get(`${urlNowcast}${old.icao}`) // Henter værdata for 3 flyplasser + en egendefinert
                    .then((response) => {
                        response.data.nowcasts.map((data: any) =>{
                            // calculate effective air temperature and set it to the instant object
                            //if (data.properties.timeseries[0].data.instant.details.air_temperature < 10 && data.properties.timeseries[0].data.instant.details.wind_speed > 1.33) {
                            data.properties.timeseries[0].data.instant.details.effective_temperature =
                                (13.12 + (data.properties.timeseries[0].data.instant.details.air_temperature * 0.6215)
                                    - ((11.37 * Math.pow((data.properties.timeseries[0].data.instant.details.wind_speed * 3.6), 0.16)))
                                    + ((data.properties.timeseries[0].data.instant.details.air_temperature * 0.3965 ) * (Math.pow((data.properties.timeseries[0].data.instant.details.wind_speed * 3.6), 0.16)))).toPrecision(2)
                            //}

                            data.properties.timeseries[0].data.instant.details.wind_speed = (data.properties.timeseries[0].data.instant.details.wind_speed * 1.943846).toPrecision(2)
                            data.properties.timeseries[0].data.instant.details.wind_speed_of_gust = (data.properties.timeseries[0].data.instant.details.wind_speed_of_gust * 1.943846).toPrecision(2)

                        })
                        dispatch(allActions.nowcastAction.setNowcast(response.data))

                    })

                axios.get(`${urlLocfor}${old.icao}`)
                    .then((response:any) => {

                        response.data.properties.timeseries.map((data: any) => {

                            // calculate effective air temperature and set it to the instant object
                            //if (data.properties.timeseries[0].data.instant.details.air_temperature < 10 && data.properties.timeseries[0].data.instant.details.wind_speed > 1.33) {
                            data.data.instant.details.effective_temperature =
                                (13.12 + (data.data.instant.details.air_temperature * 0.6215)
                                    - ((11.37 * Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))
                                    + ((data.data.instant.details.air_temperature * 0.3965 ) * (Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))).toPrecision(2)


                            //}


                            data.data.instant.details.wind_speed = (data.data.instant.details.wind_speed * 1.943846).toPrecision(2);
                            data.data.instant.details.wind_speed_of_gust = (data.data.instant.details.wind_speed_of_gust * 1.943846).toPrecision(2);
                        })
                        dispatch(allActions.weatherActions.setWeather(response.data))
                    })

                return old
            })
        }, 100_000_000)


        return () => clearInterval(interval)

    }, [])

    useEffect(() => {
        if (airport !== undefined && airport.icao !== undefined) {

            setActiveAirport(airport)
            axios.get(`${urlNowcast}${airport.icao}`) // Henter værdata for 3 flyplasser + en egendefinert
                .then((response) => {
                    response.data.nowcasts.map((data: any) =>{
                        // calculate effective air temperature and set it to the instant object
                        //if (data.properties.timeseries[0].data.instant.details.air_temperature < 10 && data.properties.timeseries[0].data.instant.details.wind_speed > 1.33) {
                            data.properties.timeseries[0].data.instant.details.effective_temperature =
                            (13.12 + (data.properties.timeseries[0].data.instant.details.air_temperature * 0.6215)
                             - ((11.37 * Math.pow((data.properties.timeseries[0].data.instant.details.wind_speed * 3.6), 0.16)))
                             + ((data.properties.timeseries[0].data.instant.details.air_temperature * 0.3965 ) * (Math.pow((data.properties.timeseries[0].data.instant.details.wind_speed * 3.6), 0.16)))).toPrecision(2)
                        //}

                        data.properties.timeseries[0].data.instant.details.wind_speed = (data.properties.timeseries[0].data.instant.details.wind_speed * 1.943846).toPrecision(2)
                        data.properties.timeseries[0].data.instant.details.wind_speed_of_gust = (data.properties.timeseries[0].data.instant.details.wind_speed_of_gust * 1.943846).toPrecision(2)

                    })
                    dispatch(allActions.nowcastAction.setNowcast(response.data))

                })

            axios.get(`${urlLocfor}${airport.icao}`)
                .then((response:any) => {

                    response.data.properties.timeseries.map((data: any) => {

                        // calculate effective air temperature and set it to the instant object
                        //if (data.properties.timeseries[0].data.instant.details.air_temperature < 10 && data.properties.timeseries[0].data.instant.details.wind_speed > 1.33) {
                                data.data.instant.details.effective_temperature =
                                (13.12 + (data.data.instant.details.air_temperature * 0.6215)
                                - ((11.37 * Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))
                                + ((data.data.instant.details.air_temperature * 0.3965 ) * (Math.pow((data.data.instant.details.wind_speed * 3.6), 0.16)))).toPrecision(2)


                        //}


                        data.data.instant.details.wind_speed = (data.data.instant.details.wind_speed * 1.943846).toPrecision(2);
                        data.data.instant.details.wind_speed_of_gust = (data.data.instant.details.wind_speed_of_gust * 1.943846).toPrecision(2);
                    })
                    dispatch(allActions.weatherActions.setWeather(response.data))
                })

        }

    },[airport])

    return (
    <div className="outer" style={{display: 'flex', minHeight: "100vh", flexDirection: "column", position: "relative"}}>
      <Navbar />


            { !error &&
                <div className={styles.airport} style={{position: "fixed", right: '0', backgroundColor: 'white', zIndex: '100'}}>
                    <Paper elevation={0} style={{display: 'flex', width: 'fit-content', padding: '1em', height: '30px', alignItems: 'center'}}>
                        {airport !== undefined &&
                            <span style={{color: "#0090a8"}}>{airport.navn}</span>
                        }

                        {nowcast !== undefined &&

                            <>
                                <Box style={{ display: 'flex', justifyContent: 'center'}}>
                                    <img style={{height: '20px', margin: "0 5px"}} src={ikonpath} alt={nowcast?.nowcasts[0].properties.timeseries[0].data.next_1_hours.summary.symbol_code} />
                                </Box>
                                <Typography sx={{color: `${temperatureColor}`}}>
                                    {nowcast?.nowcasts[0].properties.timeseries[0].data.instant.details.air_temperature}°C
                                </Typography>
                            </>

                        }
                    </Paper>

                </div>
            }
            { error &&
                <div style={{
                    zIndex: 100,
                    backgroundColor: 'yellow',
                    position: "fixed",
                    display: 'flex',
                    width: '100%',
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    top: "50%",
                    justifyContent: 'center',

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
      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <Routes>
            {/*

                <Route path="/list" element={<Testlist />} />
                <Route path="/input" element={<Testinputs />} />
                <Route path="/  " element={<ShowInput />} />

            */}
          <Route path="/flyplass" element={<Trafikklys />} />
          <Route path="/rute" element={<Pilot />} />
          <Route path="/kart" element={<Kart />} />
          <Route path="/" element={<Hjem />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

