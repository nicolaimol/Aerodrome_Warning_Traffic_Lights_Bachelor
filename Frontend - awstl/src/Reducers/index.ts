import input from "./input";
import weather from "./weather";
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    input,
    weather
})

export type RootState = ReturnType<typeof rootReducer>