import { generateStyle } from '../sliderStyleUtil';

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SliderWrapper from "../../components/SliderWrapper";


test('sliderStyle test', () => {

    // Hvis du skal lage en expect så må du sette disse som props
    // expect(sliderStyleUtil(value: number, max: number, min: number, revers: boolean, disabled: boolean))

    expect(generateStyle(50, 75, 25, false, true)).toEqual({
        mark: "makeStyles-mark-2",
        markLabel: "makeStyles-markLabel-3",
        rail: "makeStyles-rail-6",
        thumb: "makeStyles-thumb-1",
        track: "makeStyles-track-4",
        valueLabel: "makeStyles-valueLabel-5"
    })

    
})

test('slider diabled', () => {

    expect(generateStyle(50, 75, 25, false, false)).toEqual({})

})


