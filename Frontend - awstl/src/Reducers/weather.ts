import IWeatherAction from "../model/actions/weatherAction"

const weather = (state = {}, action: IWeatherAction) => {

    switch (action.type) {
        case "SET_WEATHER": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_WEATHER":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default weather;