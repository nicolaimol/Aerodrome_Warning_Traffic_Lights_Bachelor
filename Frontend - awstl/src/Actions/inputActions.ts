import iInput from "../model/input";
import input from "../Reducers/input";

const setInput = (input: iInput) => {
    return {
        type: "SET_INPUT",
        payload: input
    }
}

const clearInput = () => {
    return {
        type: "CLEAR_INPUT",
    }
}

export default {
    setInput, 
    clearInput
}