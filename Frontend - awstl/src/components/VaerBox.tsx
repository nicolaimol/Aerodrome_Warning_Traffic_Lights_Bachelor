import { Card, CardContent, Typography, CardHeader, Box} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react'
import weatherNowAirport from '../model/weatherNowAirport'

function VaerBox(props:weatherNowAirport) {

    let ikonpath:string = "/weatherIcons/";
    ikonpath += props.properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg";

    let temperatureColor = props.properties.timeseries[0].data.instant.details.air_temperature < 0 ? '#006edb' : '#c80a0a';

  return (
    <>
    <Card sx={{ minWidth: 250, mb: 5, width: "20%" }}>
        <CardHeader
        sx={{ color: '#0090a8'}}
        /*
            avatar={ <StarIcon></StarIcon> } Denne skal kun på favoritt!!
        */
            title={props.airports.navn}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CardContent>
            <Box style={{ display: 'flex', justifyContent: 'center'}}>
                    <img style={{width: '50%'}} src={ikonpath} alt={props.properties.timeseries[0].data.next_1_hours.summary.symbol_code} />
            </Box>

            <Box>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{color: `${temperatureColor}`, fontSize: 38}}>
                        {props.properties.timeseries[0].data.instant.details.air_temperature}°C
                    </Typography>
                </div> 
            </Box>

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
            
        </CardContent>
        
        </div>
        
        
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            
            
        </div>
        
        
    </Card>
    </>
  )
}

export default VaerBox