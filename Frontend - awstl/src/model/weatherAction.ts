import forecast from './forecast'

interface iWeatherAction {
    type: string,
    payload: forecast
}

export default iWeatherAction