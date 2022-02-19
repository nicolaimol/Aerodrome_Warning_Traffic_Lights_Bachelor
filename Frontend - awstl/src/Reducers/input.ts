import iInputAction from "../model/actions/inputAction";

const input = (state = {input1: "", input2: "", input3: ""}, action: iInputAction) => {
    switch (action.type) {
        case "SET_INPUT": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_INPUT":
            return {
                ...state,
                value: {input1: "", input2: "", input3: ""}
            }
        default:
            return {
                ...state
            }
    }
}

export default input;