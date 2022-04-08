import airports from '../airports'

interface iToAirportAction {
    type: string,
    payload: airports
}

export default iToAirportAction