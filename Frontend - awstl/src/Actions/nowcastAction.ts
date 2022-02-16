import vaerboksForecast from "../model/vaerboksForecast"

const setNowcast = (weather: vaerboksForecast) => {
    return {
        type: 'SET_NOWCAST',
        payload: weather
    }
}

const clearNowcast = () => {
    return {
        type: 'CLEAR_NOWCAST'
    }
}

export default {
    setNowcast, 
    clearNowcast
    
}