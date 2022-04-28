import React from 'react'
import { Box, Container } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#496c80', minHeight: 200, width: '100%' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', flexWrap: 'wrap', color: '#FFFFFF'}}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '33%', minWidth: '200px'}}>
            <p>Meteorologisk Institutt<br/>Henrik Mohns Plass 1<br/>0371 Oslo<br/>Telefon 22 96 30 00</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '33%', minWidth: '200px'}}>
            <p><u><a href="#">Veibeskrivelse</a></u><br/><u><a href="#">Kontakt oss</a></u><br/><u><a href="#">Personvern</a></u></p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '33%', minWidth: '200px', paddingTop: '1em', marginBottom: '1em'}}>
          <a href="#"><FacebookIcon sx={{ fontSize: 50 }}></FacebookIcon></a>
          <a href="#"><TwitterIcon sx={{ fontSize: 50 }}></TwitterIcon></a>
          <a href="#"><InstagramIcon sx={{ fontSize: 50 }}></InstagramIcon></a>
            
            
            
          </div>
        </div>
      </Container>

    </Box>
  )
}

export default Footer