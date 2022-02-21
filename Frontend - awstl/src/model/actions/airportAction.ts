import airports from '../airports'

interface iAirportAction {
    type: string,
    payload: airports
}

export default iAirportAction