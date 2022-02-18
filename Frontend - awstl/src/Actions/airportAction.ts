import airports from "../model/airports"

const setAirport = (input: airports) => {
    return {
        type: "SET_AIRPORT",
        payload: input
    }
}

const clearAirport = () => {
    return {
        type: "CLEAR_AIRPORT",
    }
}

export default {
    setAirport, 
    clearAirport
}