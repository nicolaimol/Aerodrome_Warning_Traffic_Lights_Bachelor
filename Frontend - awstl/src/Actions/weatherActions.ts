import forecast from "../model/forecast"

const setWeather = (weather: forecast) => {
    return {
        type: 'SET_WEATHER',
        payload: weather
    }
}

const clearWeather = () => {
    return {
        type: 'CLEAR_WEATHER'
    }
}

export default {
    setWeather,
    clearWeather
}