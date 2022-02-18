import iAirportAction from "../model/airportAction";

const airport = (state = {}, action: iAirportAction) => {
    switch (action.type) {
        case "SET_AIRPORT": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_AIRPORT":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default airport;