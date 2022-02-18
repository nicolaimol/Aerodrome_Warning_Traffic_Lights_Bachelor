import input from "./input";
import weather from "./weather";
import { combineReducers } from 'redux'
import nowcast from "./nowcast";
import airport from './airport'

export const rootReducer = combineReducers({
    input,
    weather,
    nowcast,
    airport
})

export type RootState = ReturnType<typeof rootReducer>