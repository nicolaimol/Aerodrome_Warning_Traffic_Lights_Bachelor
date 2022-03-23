import iAirportListAction from "../model/actions/airportListAction";

const airportList = (state = {}, action: iAirportListAction) => {
    switch (action.type) {
        case "SET_AIRPORT_LIST":
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_AIRPORT_LIST":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default airportList;