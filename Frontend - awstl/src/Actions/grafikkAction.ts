import weatherTimeseries from "../model/weatherTimeseries"

const setGrafikk = (input: weatherTimeseries) => {
    return {
        type: "SET_GRAFIKK",
        payload: input
    }
}

const clearGrafikk = () => {
    return {
        type: "CLEAR_GRAFIKK",
    }
}

export default {
    setGrafikk,
    clearGrafikk
}