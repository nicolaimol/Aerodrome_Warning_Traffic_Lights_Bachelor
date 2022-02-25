import terskel from "./terskel";
import weather from "./weather";
import { combineReducers } from 'redux'
import nowcast from "./nowcast";
import airport from './airport'
import grafikk from './grafikk'

export const rootReducer = combineReducers({
    terskel,
    weather,
    nowcast,
    airport,
    grafikk
})

export type RootState = ReturnType<typeof rootReducer>