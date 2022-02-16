import { Container } from '@mui/material'
import React from 'react'
import Banner from '../components/Banner'
import Arbeider from '../components/Arbeider'
import RaskVaer from '../components/RaskVaer'

function Hjem() {
  return (
    <>
    <Banner />
    <Container>
        <Arbeider />
    </Container>
    <RaskVaer />
    </>
  )
}

export default Hjem