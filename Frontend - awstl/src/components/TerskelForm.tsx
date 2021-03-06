import { Divider, Button, Checkbox } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../Actions';
import { defaultVerdier } from '../App'
import SliderWrapper from './SliderWrapper';

function TerskelForm() {

  const terskel = useSelector((state: any) => state.terskel.value)

  const [formVerdier, setFormVerdier] = useState(terskel);

  const dispatch = useDispatch()

  const handleSliderEndring = useCallback((navn: string) => (e: Event, verdi: any) => {
    setFormVerdier((setForm: any) => {
      return {
        ...setForm,
        [navn + "Min"]: verdi[0],
        [navn + "Max"]: verdi[1]
      }
    })
  }, [])

  const handleCheckboxEndring = (navn: string) => (e: any) => {
    setFormVerdier((setForm: any) => {
      return {
        ...setForm,
        [navn]: e?.target?.checked!!
      }
    })  
  }

  const tilbakestillTerskelverdier = () => {
    setFormVerdier(defaultVerdier)
      dispatch(allActions.terskelActions.setTerskel(defaultVerdier));
    }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  useEffect(() => {
      dispatch(allActions.terskelActions.setTerskel(formVerdier))
  }, [formVerdier])

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{width: "calc(100% - 40px)", padding:"5px 20px", backgroundColor: "#dff2f6"}}>
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('airTempActive')} checked={formVerdier.airTempActive}/>Lufttemperatur {terskel.airTempMin}, {terskel.airTempMax}</span>
          <SliderWrapper
            minValue={terskel.airTempMin}
            maxValue={terskel.airTempMax}
            reverse={false}
            field={"airTemp"}
            disabled={formVerdier.airTempActive}
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
      </div>
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px" }}>
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('precipitationActive')} checked={formVerdier.precipitationActive}/>Nedbør {terskel.precipitationMin}, {terskel.precipitationMax}</span>
        <SliderWrapper
          minValue={terskel.precipitationMin}
          maxValue={terskel.precipitationMax}
          field={"precipitation"}
          reverse={true}
          disabled={formVerdier.precipitationActive}
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
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('windSpeedActive')} checked={formVerdier.windSpeedActive}/>Vindhastighet {terskel.windSpeedMin}, {terskel.windSpeedMax}</span>
        <SliderWrapper
          minValue={terskel.windSpeedMin}
          maxValue={terskel.windSpeedMax}
          field={"windSpeed"}
          reverse={true}
          disabled={formVerdier.windSpeedActive}
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
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('windGustActive')} checked={formVerdier.windGustActive}/>Vindkast {terskel.windGustMin}, {terskel.windGustMax}</span>
        <SliderWrapper
          minValue={terskel.windGustMin}
          maxValue={terskel.windGustMax}
          disabled={formVerdier.windGustActive}
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
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('probThunderActive')} checked={formVerdier.probThunderActive}/>Sannsynlighet torden {terskel.probThunderMin}, {terskel.probThunderMax}</span>
        <SliderWrapper
          minValue={terskel.probThunderMin}
          maxValue={terskel.probThunderMax}
          field={"probThunder"}
          reverse={true}
          disabled={formVerdier.probThunderActive}
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
        <span style={{color: "#0090a8"}}><Checkbox onChange={handleCheckboxEndring('humidityActive')} checked={formVerdier.humidityActive}/>Luftfuktighet {terskel.humidityMin}, {terskel.humidityMax}</span>
        <SliderWrapper
          minValue={terskel.humidityMin}
          maxValue={terskel.humidityMax}
          disabled={formVerdier.humidityActive}
          field={"humidity"}
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
      <div style={{ width: "calc(100% - 40px)", padding:"5px 20px",backgroundColor: "#dff2f6" }}>
        <span style={{color: "#0090a8", textAlign: 'justify', width: '100%'}}><Checkbox onChange={handleCheckboxEndring('crosswindActive')} checked={formVerdier.crosswindActive}/>Crosswind {terskel.crosswindMin}, {terskel.crosswindMax}</span>
        <SliderWrapper
          minValue={terskel.crosswindMin}
          maxValue={terskel.crosswindMax}
          disabled={formVerdier.crosswindActive}
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
      <Button sx={{ mr: 3, mb: 3 }}onClick={tilbakestillTerskelverdier} variant="outlined">Tilbakestill</Button>
    </div>    
  </>
  )
}

export default TerskelForm