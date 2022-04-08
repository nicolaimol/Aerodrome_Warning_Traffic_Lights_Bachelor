import {Box, Card, CardContent, CardHeader, Container, Skeleton, Typography } from '@mui/material'
import React from 'react'
import Banner from '../components/Banner'
import Arbeider from '../components/Arbeider'
import RaskVaer from '../components/RaskVaer'
import { useSelector } from 'react-redux'

function Hjem() {

  const nowcast = useSelector((state: any) => state.nowcast.value)

  return (
    <>
    <Banner />
    <Container sx={{mt: 5}}>
        <Arbeider />
    </Container>
    <RaskVaer />
      {nowcast == undefined &&
          <Container sx={{mb: 5}}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: '3em'}}>
              <div>
                <Card sx={{ minWidth: 250, mb: 5, width: "100%", height: "fit-content" }}>
                  <Typography variant="h1">
                    <Skeleton variant="text" animation="wave"  />
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center'}}> {/** Div med hele kortet */}
                    <CardContent>
                      {/** Ikonet */}
                      <Box style={{ display: 'flex', justifyContent: 'center'}}>
                        <Skeleton variant="circular" animation="wave" sx={{margin: 'auto'}} width={80} height={80} />
                      </Box>
                      {/** Temperatur print */}
                      <Box>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                          <Typography sx={{fontSize: 38, width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                      {/** Box med vindretning, vindfart og vindretning pil */}
                      <Box style={{ display: 'flex', justifyContent: 'space-between',
                        flexDirection: 'row', alignItems: 'center'}}>
                        <div >
                          <Skeleton variant="circular" animation="wave" height={40} width={40} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </div>

                </Card>
              </div>
              <div>
                <Card sx={{ minWidth: 250, mb: 5, width: "100%", height: "fit-content" }}>
                  <Typography variant="h1">
                    <Skeleton variant="text" animation="wave"  />
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center'}}> {/** Div med hele kortet */}
                    <CardContent>
                      {/** Ikonet */}
                      <Box style={{ display: 'flex', justifyContent: 'center'}}>
                        <Skeleton variant="circular" animation="wave" sx={{margin: 'auto'}} width={80} height={80} />
                      </Box>
                      {/** Temperatur print */}
                      <Box>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                          <Typography sx={{fontSize: 38, width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                      {/** Box med vindretning, vindfart og vindretning pil */}
                      <Box style={{ display: 'flex', justifyContent: 'space-between',
                        flexDirection: 'row', alignItems: 'center'}}>
                        <div >
                          <Skeleton variant="circular" animation="wave" height={40} width={40} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </div>

                </Card>
              </div>
              <div>
                <Card sx={{ minWidth: 250, mb: 5, width: "100%", height: "fit-content" }}>
                  <Typography variant="h1">
                    <Skeleton variant="text" animation="wave"  />
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center'}}> {/** Div med hele kortet */}
                    <CardContent>
                      {/** Ikonet */}
                      <Box style={{ display: 'flex', justifyContent: 'center'}}>
                        <Skeleton variant="circular" animation="wave" sx={{margin: 'auto'}} width={80} height={80} />
                      </Box>
                      {/** Temperatur print */}
                      <Box>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                          <Typography sx={{fontSize: 38, width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                      {/** Box med vindretning, vindfart og vindretning pil */}
                      <Box style={{ display: 'flex', justifyContent: 'space-between',
                        flexDirection: 'row', alignItems: 'center'}}>
                        <div >
                          <Skeleton variant="circular" animation="wave" height={40} width={40} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </div>

                </Card>
              </div>
              <div>
                <Card sx={{ minWidth: 250, mb: 5, width: "100%", height: "fit-content" }}>
                  <Typography variant="h1">
                    <Skeleton variant="text" animation="wave"  />
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center'}}> {/** Div med hele kortet */}
                    <CardContent>
                      {/** Ikonet */}
                      <Box style={{ display: 'flex', justifyContent: 'center'}}>
                        <Skeleton variant="circular" animation="wave" sx={{margin: 'auto'}} width={80} height={80} />
                      </Box>
                      {/** Temperatur print */}
                      <Box>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                          <Typography sx={{fontSize: 38, width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                      {/** Box med vindretning, vindfart og vindretning pil */}
                      <Box style={{ display: 'flex', justifyContent: 'space-between',
                        flexDirection: 'row', alignItems: 'center'}}>
                        <div >
                          <Skeleton variant="circular" animation="wave" height={40} width={40} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', color: '#0090a8'}}>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                          <Typography style={{width: '2em'}}>
                            <Skeleton variant="text" animation="wave"  />
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </div>

                </Card>
              </div>

            </div>

          </Container>
      }
    </>
  )
}

export default Hjem