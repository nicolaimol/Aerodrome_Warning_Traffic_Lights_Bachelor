import terskel from "./terskel";
import weather from "./weather";
import { combineReducers } from 'redux'
import nowcast from "./nowcast";
import airport from './airport'
import grafikk from './grafikk'
import airportList from './airportList'
import toAirport from './toAirport'

export const rootReducer = combineReducers({
    terskel,
    weather,
    nowcast,
    airport,
    grafikk,
    airportList,
    toAirport
})

export type RootState = ReturnType<typeof rootReducer>