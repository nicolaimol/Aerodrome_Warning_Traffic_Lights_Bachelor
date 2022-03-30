import airports from "../model/airports"

const setToAirport = (input: airports) => {
    return {
        type: "SET_TO_AIRPORT",
        payload: input
    }
}

const clearToAirport = () => {
    return {
        type: "CLEAR_TO_AIRPORT",
    }
}

export default {
    setToAirport, 
    clearToAirport
}