import iToAirportAction from "../model/actions/toAirportAction";

const toAirport = (state = {}, action: iToAirportAction) => {
    switch (action.type) {
        case "SET_TO_AIRPORT": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_TO_AIRPORT":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default toAirport;