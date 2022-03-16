import { Box, Container, Typography } from '@mui/material'
import { minHeight } from '@mui/system' 
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useEffect, useState }from 'react'
import { useSelector } from 'react-redux'
import weatherTimeseries from '../model/weatherTimeseries';
import Rullebane from './Rullebane';

function GrafikkTrafikklys() {




    const weather = useSelector((state:any) => state.grafikk.value)
    let airport = useSelector((state:any) => state.airport.value)
    if (airport == undefined) {
        airport = {icao: "ENDU", navn: "Bardufoss Lufthan"}
    }

    const [temperatureColor, setTemperatureColor] = useState<any>(null)
    const [ikonpath, setIkonpath] = useState<string>("")
    const [nedbor, setNedbor] = useState<string>("")

    useEffect(() => {
        let ikonpath2:string =  "/weatherIcons/";
        if (weather?.data.next_1_hours != null)  ikonpath2 +=weather?.data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else if (weather?.data.next_6_hours != null)  ikonpath2 +=weather?.data.next_6_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else  ikonpath2 +=weather?.data.next_12_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        setIkonpath(ikonpath2)
        setTemperatureColor(weather?.data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'); // Er det pluss eller minus grader? farge avhenger av dette

        if (weather?.data.next_1_hours != null) setNedbor(weather?.data.next_1_hours.details.precipitation_amount + "mm neste 1 time")
        else if (weather?.data.next_6_hours != null) setNedbor(weather?.data.next_6_hours.details.precipitation_amount + "mm neste 6 timer")
        else if (weather?.data.next_12_hours != null) setNedbor(weather?.data.next_12_hours.details.precipitation_amount + "mm neste 12 timer")
    }, [weather])
    





  return (
    <>
    <div style={{ backgroundColor: '#dff2f6', minHeight: '20vh', width: '100%', padding: '0 0 30px 0' }}>
        <Container>
            {/** Ikonet */}
            {weather != undefined &&
                <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography sx={{fontSize: 30}} style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        {airport?.navn}
                    </Typography>
                    <Typography style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        {new Date(weather.time).toLocaleString()}
                    </Typography>
                    <Box style={{ display: 'flex', justifyContent: 'center', maxHeight: '100px'}} >
                        <img style={{width: '50%'}} src={ikonpath} alt={ikonpath} />
                    </Box>

                    <Box>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Typography sx={{color: `${temperatureColor}`, fontSize: 38}}>
                                {weather.data.instant.details.air_temperature}°C
                            </Typography>
                        </div>
                    </Box>

                    <Box style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{ height: '230px', width: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                            {
                                airport.rwy.split(",").map((it: any) => {

                                    return <Rullebane rullebane={it}></Rullebane>

                                })
                            }



                            <div style={{position: 'absolute',
                                right: weather.data.instant.details.wind_from_direction > 0 && weather.data.instant.details.wind_from_direction < 180 ?
                                    "-70px" : "170px",
                                top: weather.data.instant.details.wind_from_direction < 90 && weather.data.instant.details.wind_from_direction > -90 ?
                                    "-70px" : "170px",
                                textAlign: 'center',
                                color: '#0090a8'
                            }}>

                                <Typography style={{position: 'absolute', top: 0,left: "calc(50%-100px)", zIndex: 1}}>
                                    {weather.data.instant.details.wind_speed}m/s
                                </Typography>
                                <div style={{ position: 'relative', zIndex: 0,
                                transform: `rotate(${weather.data.instant.details.wind_from_direction + 90}deg)`}}>
                                    <ArrowRightAltIcon sx={{ fontSize: 100 }}></ArrowRightAltIcon>
                                </div>

                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                            <Typography>
                                {weather.data.instant.details.wind_from_direction < 0
                                    ? 360 + weather.data.instant.details.wind_from_direction
                                    : weather.data.instant.details.wind_from_direction}°
                            </Typography>
                            {nedbor != "" &&
                                <Typography>{nedbor}</Typography>
                            }

                        </div>
                    </Box>
                </div>
            }
            {weather == undefined &&

                <div>
                    <h2>Venligst vent</h2>
                </div>
            }

        </Container>
        </div>
    </>
  )
}

export default GrafikkTrafikklys