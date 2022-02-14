import { Card, CardContent, Typography, TextField, CardActions, Button, CardHeader, Box, SvgIcon as MuiSvgIcon, SvgIconProps, styled} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react'
import flyplassInfo from '../model/flyplassInfo';
import weatherNow from '../model/weatherNow';
import vaerboksForecast from '../model/vaerboksForecast';
import weatherNowAirport from '../model/weatherNowAirport'

function VaerBox(props:weatherNowAirport) {

    let ikonpath:string = "/weatherIcons/";
    ikonpath += props.properties.timeseries[0].data.next_1_hours.summary.symbol_code + ".svg";


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
                <ArrowRightAltIcon sx={{ fontSize: 100 }}></ArrowRightAltIcon>
                
            </Box>
            
        </CardContent>
        
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