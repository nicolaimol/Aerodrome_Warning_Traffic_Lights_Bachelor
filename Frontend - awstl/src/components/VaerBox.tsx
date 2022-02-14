import { Card, CardContent, Typography, TextField, CardActions, Button, CardHeader, Box, SvgIcon as MuiSvgIcon, SvgIconProps, styled} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react'
import flyplassInfo from '../model/flyplassInfo';


function VaerBox(props:flyplassInfo) {

    let ikonpath:string = "../weatherIcons/";
    ikonpath += props.ikonNavn;


  return (
    <>
    <Card sx={{ maxWidth: 345, mb: 5 }}>
        <CardHeader
            avatar={
            <StarIcon></StarIcon>
            }
            title={props.navn}
        />
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <CardContent>
            <Box>
                    <img src={ikonpath} alt={props.ikonNavn} />
            </Box>
            <Box>
                <ArrowRightAltIcon sx={{ fontSize: 100 }}></ArrowRightAltIcon>
                
            </Box>
            
        </CardContent>
        
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Typography>
                Vind er {props.styrke} m/s retning {props.retning}
            </Typography>
        </div>
        
        
    </Card>
    </>
  )
}

export default VaerBox