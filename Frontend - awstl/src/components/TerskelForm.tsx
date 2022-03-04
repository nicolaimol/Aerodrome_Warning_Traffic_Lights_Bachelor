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
            [navn]: verdi,
        })

    }

    const handleChange = useEffect(() => {
        dispatch(allActions.terskelActions.setTerskel(formVerdier))

    }, [formVerdier])



    const handleSubmit = (e: any) => {
        e.preventDefault();
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{ width: "70%" }}>
            Lufttemperatur terskelverdi
            <Slider
              value={formVerdier.airTemp}

              onChange={handleSliderEndring("airTemp")}
              defaultValue={0}
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
          value={formVerdier.precipitationAmmount}

          onChange={handleSliderEndring("precipitationAmmount")}
          defaultValue={20}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0mm",
            },
            {
                value: 30,
                label: "30mm",

            },
            {
              value: 60,
              label: "60mm",
            },
          ]}
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Vindfart terskelverdi
        <Slider
          value={formVerdier.windSpeed}

          onChange={handleSliderEndring("windSpeed")}
          defaultValue={30}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0m/s",
            },
            {
                value: 30,
                label: "30m/s",

            },
            {
              value: 60,
              label: "60m/s",
            },
          ]}
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Vindkast terskelverdi
        <Slider
          value={formVerdier.windGust}

          onChange={handleSliderEndring("windGust")}
          defaultValue={20}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0m/s",
            },
            {
                value: 30,
                label: "30m/s",

            },
            {
              value: 60,
              label: "60m/s",
            },
          ]}
          valueLabelDisplay="off"
        />
      </div>
      <div style={{ width: "70%" }}>
        Sannsynlighet torden terskelverdi
        <Slider
          value={formVerdier.probThunder}

          onChange={handleSliderEndring("probThunder")}
          defaultValue={10}
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
          value={formVerdier.humidity}

          onChange={handleSliderEndring("humidity")}
          defaultValue={2}
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
        Tåke terskelverdi
        <Slider
          value={formVerdier.fog}

          onChange={handleSliderEndring("fog")}
          defaultValue={40}
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
        Sannsynlighet is terskelverdi
        <Slider
          value={formVerdier.probIce}

          onChange={handleSliderEndring("probIce")}
          defaultValue={10}
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
          value={formVerdier.crosswind}

          onChange={handleSliderEndring("crosswind")}
          defaultValue={30}
          step={1}
          min={0}
          max={60}
          marks={[
            {
              value: 0,
              label: "0m/s",
            },
            {
                value: 30,
                label: "30m/s",

            },
            {
              value: 60,
              label: "60m/s",
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