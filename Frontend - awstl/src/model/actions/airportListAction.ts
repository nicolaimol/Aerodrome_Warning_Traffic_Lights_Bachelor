import airports from '../airports'

interface iAirportListAction {
    type: string,
    payload: airports[]
}

export default iAirportListAction