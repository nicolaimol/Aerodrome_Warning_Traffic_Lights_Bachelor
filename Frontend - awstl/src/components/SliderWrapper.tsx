import React from 'react'
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

    //console.log("render", props.field)

    return (

    <Slider
        classes={
            generateStyle(props.maxValue, props.max, props.min, props.reverse)
        }
        onChange={props.handleSliderEndring(props.field)}
        value={[props.minValue, props.maxValue]}
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