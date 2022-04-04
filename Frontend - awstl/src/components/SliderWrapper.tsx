import React, {useEffect, useState} from 'react'
import { Slider } from "@mui/material";
import { generateStyle } from '../util/sliderStyleUtil'

function checkEqual(prev: any, next: any) {
    const bool = (prev.minValue === next.minValue && prev.maxValue === next.maxValue && prev.disabled === next.disabled)

    return bool
}

function SliderWrapper(props: any) {

    console.log("render", props.field)

    const [values, setValue] = useState([props.minValue, props.maxValue])
    const [disabled, setDisabled] = useState<boolean>(props.disabled !== undefined ? props.disabled as boolean : false)


    const changeVisual = (event?: Event, verdi?: any) => {
        setValue(verdi)
    }


    useEffect(() => {
        setValue([props.minValue, props.maxValue])
        setDisabled(props.disabled)
    }, [props])


    return (

    <Slider

        classes={
            generateStyle(((values[1] + values[0])/2), props.max, props.min, props.reverse, disabled)
        }

        onChangeCommitted={props?.handleSliderEndring(props.field)}
        onChange={changeVisual}
        //defaultValue={values}
        value={values}
        step={props.step}
        min={props.min}
        max={props.max}

        disabled={disabled}

        marks={props.marks}
        valueLabelDisplay="auto"
    />

    )

}

export default React.memo(SliderWrapper, checkEqual)
//export default React.memo(SliderWrapper)
//export default SliderWrapper