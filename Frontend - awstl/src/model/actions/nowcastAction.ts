import vaerboksForecast from '../vaerboksForecast'

interface iNowcastAction {
    type: string,
    payload: vaerboksForecast
}

export default iNowcastAction