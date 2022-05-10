import { Box, Container, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useEffect, useState }from 'react'
import { useSelector } from 'react-redux'
import Rullebane from './Rullebane';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Hex from './Hex';
import { crosswind } from '../util/calcCrosswind';


function GrafikkTrafikklys() {

    const weather = useSelector((state:any) => state.grafikk.value)
    let airport = useSelector((state:any) => state.airport.value)
    const terskel = useSelector((state: any) => state.terskel.value);

    const cw = crosswind(airport?.rwy!!, weather?.data.instant.details.wind_from_direction, weather?.data.instant.details.wind_speed);

    let precipitation_amount = 0;
    let probThunder = 0

    const [temperatureColor, setTemperatureColor] = useState<any>(null)
    const [ikonpath, setIkonpath] = useState<string>("")
    const [nedbor, setNedbor] = useState<string>("")

    if (airport === undefined) {
        airport = {icao: "ENDU", navn: "Bardufoss Lufthan"}
    }

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
    
    if ( weather?.data.next_1_hours !== undefined) {
        precipitation_amount =  weather?.data?.next_1_hours?.details?.precipitation_amount
        probThunder = weather?.data.next_1_hours?.details?.probability_of_thunder
    } else if (weather?.data.next_6_hours !== undefined) {
        precipitation_amount =  weather?.data?.next_6_hours?.details?.precipitation_amount / 6
        probThunder = weather?.data?.next_6_hours?.details?.probability_of_thunder
    } else {
        precipitation_amount =  weather?.data?.next_12_hours?.details?.precipitation_amount / 12
        probThunder = weather?.data?.next_12_hours?.details?.probability_of_thunder
    }

  return (
    <>
    <div style={{ backgroundColor: '#dff2f6', minHeight: '20vh', width: '100%', padding: '0 0 30px 0' }}>
        <Container>
        {weather !== undefined &&
            <div>
                <Typography sx={{fontSize: 30}} style={{display: 'flex', justifyContent: 'center', width: '100%', color: '#0090a8'}}>
                    {airport?.navn}
                </Typography>
                <Typography style={{display: 'flex', justifyContent: 'center', width: '100%', color: '#0090a8'}}>
                    {new Date(weather.time).toLocaleString()}
                </Typography>
            </div>
        }
        
        <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap:'wrap'}}>
            <div style={{ width: '33%', minWidth: 'fit-content'}}>
                <Typography gutterBottom style={{ fontSize: 20, color: "#0090a8", display: 'flex', alignItems:'center'}}>
                    Effektiv lufttemperatur: {weather?.data.instant.details.effective_temperature} °C
                    { // color : weather?.data.instant.details.air_temperature < terskel?.airTempMin ? "red" :  weather?.data.instant.details.air_temperature > terskel?.airTempMax ? "#0090a8" : "#FFAF42"
                        weather?.data.instant.details.effective_temperature < terskel?.airTempMax &&
                            <Hex color={weather?.data.instant.details.effective_temperature < terskel?.airTempMin ? "red" : "#FFAF42"} />
                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, color:"#0090a8", display: 'flex', alignItems:'center'}}>
                    Nedbør: {isNaN(precipitation_amount) ? "N/A" : precipitation_amount?.toPrecision(2) + "mm"}
                    {
                        precipitation_amount > terskel?.precipitationMin &&
                            <Hex color={precipitation_amount > terskel?.precipitationMax ? "red" : "#FFAF42"} />
                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, color:"#0090a8",  display: 'flex', alignItems:'center'}}>
                    Vindhastighet: {weather?.data.instant.details.wind_speed} kt
                    { weather?.data.instant.details.wind_speed > terskel?.windSpeedMin &&
                        <Hex color={weather?.data.instant.details.wind_speed > terskel?.windSpeedMax ? "red" : "#FFAF42"} />

                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, display: 'flex', alignItems:'center', color: "#0090a8"}}>
                    Vindkast: {(isNaN(weather?.data.instant.details.wind_speed_of_gust) === true ? "N/A" : weather?.data.instant.details.wind_speed_of_gust + " kt")}
                    { weather?.data.instant.details.wind_speed_of_gust > terskel?.windGustMin &&
                        <Hex color={ weather?.data.instant.details.wind_speed_of_gust > terskel?.windGustMax ? "red" : "#FFAF42"} />
                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, display: 'flex', alignItems:'center', color : "#0090a8"}}>
                    Sannsynlighet torden: {(probThunder <= 100 && probThunder >= 0) ? probThunder + "%" : "N/A"}
                    { probThunder >= terskel?.probThunderMin &&
                        <Hex color={probThunder > terskel?.probThunderMax ? "red" : "FFAF42"} />

                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, display: 'flex', alignItems:'center', color : "#0090a8"}}>
                    Luftfuktighet: {weather?.data.instant.details.relative_humidity}%
                    { weather?.data.instant.details.relative_humidity > terskel?.humidityMin &&
                        <Hex color={weather?.data.instant.details.relative_humidity > terskel?.humidityMax ? "red" : "#FFAF42"} />

                    }
                </Typography>
                <Typography gutterBottom style={{ fontSize: 20, display: 'flex', alignItems:'center', color : "#0090a8"}}>
                    Crosswind: {cw.toPrecision(2)} kt
                    { cw > terskel?.crosswindMin &&
                        <Hex color={cw > terskel?.crosswindMax ? "red" : "#FFAF42"} />

                    }
                </Typography>
            </div>
            <div style={{ width: '33%', minWidth: 'fit-content' }}>
                {/** Ikonet */}
                {weather !== undefined &&
                    <div style={{width: "100%", display: 'flex', flexDirection: 'column', flexWrap:'wrap', justifyContent: 'center'}}> 
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
                        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', color: '#0090a8'}}>
                            <Typography>
                                {weather.data.instant.details.wind_from_direction < 0
                                    ? 360 + weather.data.instant.details.wind_from_direction
                                    : weather.data.instant.details.wind_from_direction}°
                            </Typography>
                            {nedbor !== "" &&
                                <Typography>{nedbor}</Typography>
                            }
                        </div>
                    </div>
                }
                {weather === undefined &&
                    <div>
                        <h2>Vennligst vent</h2>
                    </div>
                }
            </div>
            <div style={{ width: '33%', minWidth: 'fit-content', position: 'relative' }}>
                <img alt="compass rose" src="/Gray_compass_rose.svg" style={{height: '40px', position: 'absolute', bottom: 0, right: 0}}/>
                {/** Ikonet */}
                {weather !== undefined &&
                    <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Typography gutterBottom style={{ fontSize: 20, color: '#0090a8'}}>
                                Vind i forhold til rullebane
                            </Typography>
                        </div>
                        <Box style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}> 
                            <div style={{ height: '230px', maxWidth: '100%', width: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                                <div style={{display: 'flex', flexWrap: 'wrap', minWidth: '215px'}}>
                                {
                                    airport.rwy.split(",").map((it: any) => {
                                        return <Rullebane key={it[0]} rullebane={it}></Rullebane>
                                    })
                                }
                                </div>
                                <div style={{position: 'absolute',
                                    right: (weather.data.instant.details.wind_from_direction > 0 && weather.data.instant.details.wind_from_direction < 180) ||
                                        (weather.data.instant.details.wind_from_direction < -360 && weather.data.instant.details.wind_from_direction > -180) ?
                                        "0px" : "90%",
                                    top: (weather.data.instant.details.wind_from_direction > 90 && weather.data.instant.details.wind_from_direction < 270) ||
                                        (weather.data.instant.details.wind_from_direction > -270 && weather.data.instant.details.wind_from_direction < -90) ?
                                        "150px" : "0px",
                                    textAlign: 'center',
                                    color: '#0090a8'
                                }}>
                                    <Typography style={{position: 'absolute', top: -10,left: "calc(50%-100px)", zIndex: 1, }}>
                                        {weather.data.instant.details.wind_speed}kt
                                    </Typography>
                                    <div style={{ position: 'relative', zIndex: 0,
                                    transform: `rotate(${weather.data.instant.details.wind_from_direction + 90}deg)`}}>
                                        <ArrowRightAltIcon sx={{ fontSize: 40 }}></ArrowRightAltIcon>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </div>
                }
                
                {weather === undefined &&
                    <div>
                        <h2>Venligst vent</h2>
                    </div>
                }
            </div>
        </div>
        </Container>
        </div>
    </>
  )
}

export default GrafikkTrafikklys