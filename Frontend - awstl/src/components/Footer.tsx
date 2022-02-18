import React from 'react'
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material'

function Footer() {
  return (
    <Box>
      <BottomNavigation sx={{ backgroundColor: '#496c80', height: 200 }}>
        {/*
        <Typography
        variant= 'h6'
        sx={{ color: 'white'}}>
            Dette er en Footer
        </Typography>
        */}
      </BottomNavigation>
    </Box>
  )
}

export default Footer