import React, {useEffect, useState} from 'react'
import { Slider } from "@mui/material";
import { generateStyle } from '../util/sliderStyleUtil'

function checkEqual(prev: any, next: any) {
    const bool = (prev.minValue === next.minValue && prev.maxValue === next.maxValue)



    if (!bool) {
        //console.log(prev, next)
        //console.log("rerender", prev.field)
        //console.log(prev.minValue, next.minValue)
        // console.log(prev.field, next.field)
        //console.log(prev, next)
    }


    return bool
}

function SliderWrapper(props: any) {

    console.log("render", props.field)

    const [values, setValue] = useState([props.minValue, props.maxValue])

    /*
    const changeVisual = (event?: Event, verdi?: any) => {
        setValue(verdi)
    }
     */

    /*
    useEffect(() => {
        setValue([props.minValue, props.maxValue])
    }, [props])
    */

    return (

    <Slider
        classes={
            generateStyle(((props.maxValue + props.minValue)/2), props.max, props.min, props.reverse)
        }
        onChangeCommitted={props?.handleSliderEndring(props.field)}
        //onChange={changeVisual}
        defaultValue={values}
        step={props.step}
        min={props.min}
        max={props.max}

        marks={props.marks}
        valueLabelDisplay="auto"
    />

    )

}

export default React.memo(SliderWrapper, checkEqual)
//export default React.memo(SliderWrapper)