import { Box, Typography } from '@mui/material'
import { minHeight } from '@mui/system' 
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useEffect, useState }from 'react'
import { useSelector } from 'react-redux'
import weatherTimeseries from '../model/weatherTimeseries';

function GrafikkTrafikklys() {




    const weather = useSelector((state:any) => state.grafikk.value)

    const [temperatureColor, setTemperatureColor] = useState<any>(null)
    const [ikonpath, setIkonpath] = useState<string>("")

    useEffect(() => {
        console.log(weather)
        let ikonpath2:string =  "/weatherIcons/";
        if (weather?.data.next_1_hours != null)  ikonpath2 +=weather?.data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else if (weather?.data.next_6_hours != null)  ikonpath2 +=weather?.data.next_6_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        else  ikonpath2 +=weather?.data.next_12_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data
        setIkonpath(ikonpath2)
        setTemperatureColor(weather?.data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'); // Er det pluss eller minus grader? farge avhenger av dette
    }, [weather])
    





  return (
    <>
    <div style={{ backgroundColor: '#dff2f6', minHeight: '20vh', width: '100%' }}>
        {/** Ikonet */}
        {weather != undefined &&
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                    <div style={{ transform: `rotate(${weather.data.instant.details.wind_from_direction - 90}deg)`}}>
                        <ArrowRightAltIcon sx={{ fontSize: 100 }}></ArrowRightAltIcon>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                        <Typography>
                            {weather.data.instant.details.wind_speed}m/s
                        </Typography>
                        <Typography>
                            {weather.data.instant.details.wind_from_direction < 0
                                ? 360 + weather.data.instant.details.wind_from_direction
                                : weather.data.instant.details.wind_from_direction}°
                        </Typography>
                    </div>
                </Box>
            </div>
        }
        {weather == undefined &&

            <div>
                <h2>Venligst vent</h2>
            </div>
        }
        </div>
    </>
  )
}

export default GrafikkTrafikklys