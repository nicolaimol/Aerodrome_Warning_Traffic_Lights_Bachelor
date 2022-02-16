import INowcastAction from "../model/nowcastAction"

const nowcast = (state = {}, action: INowcastAction) => {

    switch (action.type) {
        case "SET_NOWCAST": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_NOWCAST":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default nowcast;