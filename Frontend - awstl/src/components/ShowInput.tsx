import { display } from "@mui/system";
import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "../Reducers";




const ShowInput = () => {

    const input = useSelector((state:any) => state.input.value)
    console.log(input)

    return (
        <div style={{"width": "100%", display: "flex", justifyContent: "center"}}>
            {input != undefined &&
                <div>
                    <p>input1: {input.input1}</p>
                    <p>input2: {input.input2}</p>
                    <p>input3: {input.input3}</p>
                </div>
            }
            {input == undefined &&
                <div><p>Ingen verdier satt</p></div>
            }
        </div>
    )
}

export default ShowInput;