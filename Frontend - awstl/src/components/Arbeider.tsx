import { Box } from '@mui/material'
import '../App.css';
import React from 'react'
import Bakkemannskap from './Bakkemannskap';
import Flygeleder from './Flygeleder';
import Pilot from './Pilot';

function Arbeider() {


  return (
    <>
    <Box id="arbeiderBox" sx={{ m: 10 }} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Bakkemannskap />
        <Flygeleder />
        <Pilot />
    </Box>
        
        
    </>

  )
}

export default Arbeider