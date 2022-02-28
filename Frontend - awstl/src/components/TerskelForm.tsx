import { Slider } from '@mui/material';
import React, { useState } from 'react'


const defaultVerdier = {
    lufttemperatur: 0,
    nedboer: 20,
    vindfart: 30,
    vindkast: 40,
    probTorden: 0,
    luftfuktighet: 2,
    fog: 40,
    probIs: 20,
    crosswind: 50,
  };

function TerskelForm() {

    const [formVerdier, setFormVerdier] = useState(defaultVerdier);

    const handleSliderEndring = (navn: string) => (e: Event, verdi: any) => {

        setFormVerdier({
            ...formVerdier,
            [navn]: verdi,
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formVerdier);
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
    <div style={{ width: "70%" }}>
            Lufttemperatur terskelverdi
            <Slider
              value={formVerdier.lufttemperatur}

              onChange={handleSliderEndring("lufttemperatur")}
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
              value={formVerdier.nedboer}

              onChange={handleSliderEndring("nedboer")}
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
              value={formVerdier.vindfart}

              onChange={handleSliderEndring("vindfart")}
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
              value={formVerdier.vindkast}

              onChange={handleSliderEndring("vindkast")}
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
              value={formVerdier.probTorden}

              onChange={handleSliderEndring("probTorden")}
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
              value={formVerdier.luftfuktighet}

              onChange={handleSliderEndring("luftfuktighet")}
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
              value={formVerdier.probIs}

              onChange={handleSliderEndring("probIs")}
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