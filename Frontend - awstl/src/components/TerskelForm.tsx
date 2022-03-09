import { Slider, Divider, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../Actions';
import * as buffer from "buffer";
import axios from 'axios'

import { defaultVerdier } from '../App'
import { generateStyle } from '../util/sliderStyleUtil'

function TerskelForm() {

    const terskel = useSelector((state: any) => state.terskel.value)
    const airport = useSelector((state: any) => state.airport.value)

    const [formVerdier, setFormVerdier] = useState(terskel);
    const dispatch = useDispatch()

    const handleSliderEndring = (navn: string) => (e: Event, verdi: any) => {
        setFormVerdier({
            ...formVerdier,
            [navn + "Min"]: verdi[0],
            [navn + "Max"]: verdi[1],

        })
    }

    const handleSliderEndringSingleValue = (navn: string) => (e: Event, verdi: any) => {
      setFormVerdier({
          ...formVerdier,
          [navn]: verdi,
          

      })
    }

    const handleChange = useEffect(() => {
        dispatch(allActions.terskelActions.setTerskel(formVerdier))
    }, [formVerdier])

    const tilbakestillTerskelverdier = () => {
        setFormVerdier(defaultVerdier)

        //dispatch(allActions.terskelActions.setTerskel(defaultVerdier));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6"}}>
          <span style={{color: "#0090a8"}}>Lufttemperatur</span>
          <div style={{display: 'flex', flexDirection: "row"}}>
            <Slider
            classes={
                generateStyle(formVerdier.airTempMax, 60, -60, false)
            }
              onChange={handleSliderEndring("airTemp")}
              value={[formVerdier.airTempMin, formVerdier.airTempMax]}
              step={1}
              min={-60}
              max={60}
              marks={[
                {
                  value: -60,
                  label: "-60°C",
                },
                {
                    value: -30,
                    label: "-30°C",
                },
                {
                  value: 0,
                  label: "0°C",
                },
                {
                    value: 30,
                    label: "30°C",
                    
                },
                {
                  value: 60,
                  label: "60°C",
                },
              ]}
              valueLabelDisplay="auto"
            />
          <p style={{marginLeft: '30px', width: 'fit-content', whiteSpace: "nowrap"}}>{`${formVerdier.airTempMin}, ${formVerdier.airTempMax}`}</p>
          </div>
          </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Nedbør</span>
        <Slider
            classes={
                generateStyle(formVerdier.precipitationMax, 5, 0, true)
            }

          value={[formVerdier.precipitationMin, formVerdier.precipitationMax]}
          onChange={handleSliderEndring("precipitation")}
          step={0.1}
          min={0}
          max={5}
          marks={[
            {
              value: 0,
              label: "0mm",
            },
            {
                value: 2.5,
                label: "2.5mm",

            },
            {
              value: 5,
              label: "5mm",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Vindfart</span>
        <Slider
            classes={
                generateStyle(formVerdier.windSpeedMax, 60, 0, true)
            }

          value={[formVerdier.windSpeedMin, formVerdier.windSpeedMax]}
          onChange={handleSliderEndring("windSpeed")}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0 kt",
            },
            {
                value: 30,
                label: "30 kt",

            },
            {
              value: 60,
              label: "60 kt",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Vindkast</span>
        <Slider
            classes={
                generateStyle(formVerdier.windGustMax, 60, 0, true)
            }

          value={[formVerdier.windGustMin, formVerdier.windGustMax]}
          onChange={handleSliderEndring("windGust")}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0 kt",
            },
            {
                value: 30,
                label: "30 kt",

            },
            {
              value: 60,
              label: "60 kt",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Sannsynlighet torden</span>
        <Slider
            classes={
                generateStyle(formVerdier.probThunderMax, 100, 0, true)
            }

          value={[formVerdier.probThunderMin, formVerdier.probThunderMax]}
          onChange={handleSliderEndring("probThunder")}
          step={1}
          min={0}
          max={100}
          marks={[
            {
              value: 0,
              label: "0%",
            },
            {
                value: 50,
                label: "50%",

            },
            {
              value: 100,
              label: "100%",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Luftfuktighet</span>
        <Slider
            classes={
                generateStyle(formVerdier.humidityMax, 100, 40, true)
            }

          value={[formVerdier.humidityMin, formVerdier.humidityMax]}
          onChange={handleSliderEndring("humidity")}
          step={1}
          min={40}
          max={100}
          marks={[
            {
              value: 40,
              label: "40%",
            },
            {
                value: 70,
                label: "70%",

            },
            {
              value: 100,
              label: "100%",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Tåke</span>
        <Slider
            disabled

          value={formVerdier.fog}
          onChange={handleSliderEndringSingleValue("fog")}
          step={1}
          min={0}
          max={100}
          marks={[
            {
              value: 0,
              label: "0%",
            },
            {
                value: 50,
                label: "50%",

            },
            {
              value: 100,
              label: "100%",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Crosswind</span>
        <Slider
            classes={
                generateStyle(formVerdier.crosswindMax, 60, 0, true)
            }

          value={[formVerdier.crosswindMin, formVerdier.crosswindMax]}
          onChange={handleSliderEndring("crosswind")}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0 kt",
            },
            {
                value: 30,
                label: "30 kt",

            },
            {
              value: 60,
              label: "60 kt",
            },
          ]}
          valueLabelDisplay="auto"
        />
      </div>
    </form>
        <Divider />
        <Button onClick={tilbakestillTerskelverdier} variant="outlined">Tilbakestill</Button>
    </>
  )
}

export default TerskelForm