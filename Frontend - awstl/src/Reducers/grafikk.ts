import iGrafikkAction from "../model/actions/grafikkAction";

const grafikk = (state = {}, action: iGrafikkAction) => {
    switch (action.type) {
        case "SET_GRAFIKK":
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_GRAFIKK":
            return {
                ...state,
                value: {}
            }
        default:
            return state
    }
}

export default grafikk;