import input from "./input";
import weather from "./weather";
import { combineReducers } from 'redux'
import nowcast from "./nowcast";

export const rootReducer = combineReducers({
    input,
    weather,
    nowcast
})

export type RootState = ReturnType<typeof rootReducer>