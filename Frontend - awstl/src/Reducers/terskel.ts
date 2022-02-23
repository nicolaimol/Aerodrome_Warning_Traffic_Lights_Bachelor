import iTerskelAction from "../model/actions/terskelAction";

const terskel = (state = {}, action: iTerskelAction) => {
    switch (action.type) {
        case "SET_INPUT": 
            return {
                ...state,
                value: action.payload
            }
        case "CLEAR_INPUT":
            return {
                ...state,
                value: {}
            }
        default:
            return {
                ...state
            }
    }
}

export default terskel;