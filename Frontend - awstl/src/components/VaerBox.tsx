import { Card, CardContent, Typography, CardHeader, Box} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react'
import weatherNowAirport from '../model/weatherNowAirport'

function VaerBox(props:weatherNowAirport) {

    let ikonpath:string = "/weatherIcons/";
    ikonpath += props.properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg";

    let temperatureColor = "";

    if (props.properties.timeseries[0].data.instant.details.air_temperature < 0) {
        temperatureColor = 'blue';
    } else {
        temperatureColor = 'red';
    }



  return (
    <>
    <Card sx={{ maxWidth: 345, mb: 5 }}>
        <CardHeader
            avatar={
            <StarIcon></StarIcon>
            }
            title={props.airports.navn}
        />
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <CardContent>
            <Box>
                    <img src={ikonpath} alt={props.properties.timeseries[0].data.next_1_hours.summary.symbol_code} />
            </Box>
            <Box>
                <div style={{ transform: `rotate(${props.properties.timeseries[0].data.instant.details.wind_from_direction - 90}deg)`}}>
                    <ArrowRightAltIcon sx={{ fontSize: 100}}></ArrowRightAltIcon>
                </div>
                
                
            </Box>
            
        </CardContent>
        
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Typography 
            sx={{color: `${temperatureColor}`, fontSize: 24}}>
            {props.properties.timeseries[0].data.instant.details.air_temperature}°C
        </Typography>
        </div> 
        
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            
            <Typography>
                Vind er {props.properties.timeseries[0].data.instant.details.wind_speed} m/s retning {props.properties.timeseries[0].data.instant.details.wind_from_direction}
            </Typography>
        </div>
        
        
    </Card>
    </>
  )
}

export default VaerBox