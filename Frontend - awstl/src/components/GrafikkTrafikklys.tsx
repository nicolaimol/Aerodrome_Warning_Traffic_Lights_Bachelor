import { Box, Typography } from '@mui/material'
import { minHeight } from '@mui/system' 
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react'

function GrafikkTrafikklys() {

    

    let ikonpath:string = "/weatherIcons/";
    ikonpath += props.properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg"; // Setter riktig ikon avhengig data

    let temperatureColor = props.properties.timeseries[0].data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a'; // Er det pluss eller minus grader? farge avhenger av dette



  return (
    <>
    <div style={{ backgroundColor: '#dff2f6', minHeight: '20vh', width: '100%' }}>
        {/** Ikonet */}
        <Box style={{ display: 'flex', justifyContent: 'center'}}>
                    <img style={{width: '50%'}} src={ikonpath} alt={props.properties.timeseries[0].data.next_1_hours.summary.symbol_code} />
                </Box>
                {/** Temperatur print */}
                <Box>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Typography sx={{color: `${temperatureColor}`, fontSize: 38}}>
                            {props.properties.timeseries[0].data.instant.details.air_temperature}°C
                        </Typography>
                    </div> 
                </Box>
                {/** Box med vindretning, vindfart og vindretning pil */}
                <Box style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{ transform: `rotate(${props.properties.timeseries[0].data.instant.details.wind_from_direction - 90}deg)`}}>
                        <ArrowRightAltIcon sx={{ fontSize: 100 }}></ArrowRightAltIcon>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                        <Typography>
                            {props.properties.timeseries[0].data.instant.details.wind_speed}m/s 
                        </Typography>
                        <Typography>
                            {props.properties.timeseries[0].data.instant.details.wind_from_direction < 0 
                            ? 360 + props.properties.timeseries[0].data.instant.details.wind_from_direction 
                            : props.properties.timeseries[0].data.instant.details.wind_from_direction}°
                        </Typography>
                    </div>
                </Box>
    </div>
    </>
  )
}

export default GrafikkTrafikklys