import airports from "../model/airports"

const setAirportList = (input: airports[]) => {
    return {
        type: "SET_AIRPORT_LIST",
        payload: input
    }
}

const clearAirportList = () => {
    return {
        type: "CLEAR_AIRPORT_LIST",
    }
}

export default {
    setAirportList,
    clearAirportList
}