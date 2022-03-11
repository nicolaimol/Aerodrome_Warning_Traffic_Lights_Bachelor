import { Slider, Divider, Button } from '@mui/material';
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../Actions';
import * as buffer from "buffer";
import axios from 'axios'

import { defaultVerdier } from '../App'
import { generateStyle } from '../util/sliderStyleUtil'
import SliderWrapper from './SliderWrapper';

function TerskelForm() {

    const terskel = useSelector((state: any) => state.terskel.value)
    const airport = useSelector((state: any) => state.airport.value)

    const copy = JSON.parse(JSON.stringify(terskel))

    //console.log("load", copy)

    const [formVerdier, setFormVerdier] = useState(terskel);
    //console.log("init",formVerdier)
    const dispatch = useDispatch()

    //console.log("rendering form")


    const handleSliderEndring = useCallback((navn: string) => (e: Event, verdi: any) => {
        //console.log(verdi)

        //console.log(navn, e, verdi)

        setFormVerdier((setForm: any) => {

            return {
                ...setForm,
                [navn + "Min"]: verdi[0],
                [navn + "Max"]: verdi[1]
            }
        })

        //console.log("old", terskel)

        /*
        const newTerskel ={
            ...terskel,
            [navn + "Min"]: verdi[0],
            [navn + "Max"]: verdi[1]
        }

         */

        //console.log("new", newTerskel)
        //dispatch(allActions.terskelActions.setTerskel(newTerskel))

        /*
        setFormVerdier({
            ...formVerdier,
            [navn + "Min"]: verdi[0],
            [navn + "Max"]: verdi[1]
        })
         */
    }, [])

    const handleSliderEndringSingleValue = (navn: string) => (e: Event, verdi: any) => {

        /*
        setFormVerdier({
          ...formVerdier,
          [navn]: verdi,
      })

         */
    }
    useEffect(() => {
        dispatch(allActions.terskelActions.setTerskel(formVerdier))
        //console.log(formVerdier)
        //console.log(terskel)
    }, [formVerdier])


    const tilbakestillTerskelverdier = () => {

        //setFormVerdier(defaultVerdier)
        //formVerdier = defaultVerdier

        dispatch(allActions.terskelActions.setTerskel(defaultVerdier));
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
            <SliderWrapper
                minValue={terskel.airTempMin}
                maxValue={terskel.airTempMax}

                reverse={false}
                field={"airTemp"}

                handleSliderEndring={handleSliderEndring}

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
            />
          <p style={{marginLeft: '30px', width: 'fit-content', whiteSpace: "nowrap"}}>{`${terskel.airTempMin}, ${terskel.airTempMax}`}</p>
          </div>
          </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Nedbør</span>
        <SliderWrapper

            minValue={terskel.precipitationMin}
            maxValue={terskel.precipitationMax}

            field={"precipitation"}
            reverse={true}

            handleSliderEndring={handleSliderEndring}

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

        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Vindfart</span>
        <SliderWrapper

            minValue={terskel.windSpeedMin}
            maxValue={terskel.windSpeedMax}

            field={"windSpeed"}
            reverse={true}

            handleSliderEndring={handleSliderEndring}

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
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Vindkast</span>
        <SliderWrapper

            minValue={terskel.windGustMin}
            maxValue={terskel.windGustMax}

            field={"windGust"}
            reverse={true}

            handleSliderEndring={handleSliderEndring}

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
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Sannsynlighet torden</span>
        <SliderWrapper

            minValue={terskel.probThunderMin}
            maxValue={terskel.probThunderMax}

            field={"probThunder"}
            reverse={true}

            handleSliderEndring={handleSliderEndring}

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
        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
          <span style={{color: "#0090a8"}}>Luftfuktighet</span>
        <SliderWrapper

            minValue={terskel.humidityMin}
            maxValue={terskel.humidityMax}

            field={"humidity"}
          reverse={true}

            handleSliderEndring={handleSliderEndring}

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

        />
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6" }}>
          <span style={{color: "#0090a8"}}>Tåke</span>
        <Slider

            disabled

          value={terskel.fog}
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
        <SliderWrapper

            minValue={terskel.crosswindMin}
            maxValue={terskel.crosswindMax}

            field={"crosswind"}
            reverse={true}

            handleSliderEndring={handleSliderEndring}

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

        />
      </div>
    </form>
        <Divider sx={{mb: 3}} />
        <div style={{ display: 'flex', justifyContent: 'right'}}>
          <Button sx={{ mr: 3 }}onClick={tilbakestillTerskelverdier} variant="outlined">Tilbakestill</Button>
        </div>
        
    </>
  )
}

//export default React.memo(TerskelForm)
export default TerskelForm