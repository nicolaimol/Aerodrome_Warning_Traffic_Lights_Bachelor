import terskelData from '../model/terskelData'
import terskel from "../Reducers/terskel";

const setTerskel = (input: terskelData) => {
    return {
        type: "SET_INPUT",
        payload: input
    }
}

const clearTerskel = () => {
    return {
        type: "CLEAR_INPUT",
    }
}

export default {
    setTerskel,
    clearTerskel
}