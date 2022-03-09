import { Slider } from '@mui/material';
import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../Actions';
import * as buffer from "buffer";
import axios from 'axios'

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

    useEffect(() => {
      setFormVerdier(terskel);
    }, [terskel])

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{ width: "70%" }}>
            Lufttemperatur terskelverdi
            <Slider

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
              valueLabelDisplay="off"
            />
          </div>
      <div style={{ width: "70%" }}>
        Nedbør terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Vindfart terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Vindkast terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Sannsynlighet torden terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Luftfuktighet terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Tåke terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Crosswind terskelverdi
        <Slider
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
          valueLabelDisplay="off"
        />
      </div>
    </form>
    </>
  )
}

export default TerskelForm