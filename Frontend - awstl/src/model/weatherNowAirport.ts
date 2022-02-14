import airports from './airports'
import weatherTimeseries from './weatherTimeseries'

interface weatherNowAirport {
    properties: {
        timeseries: weatherTimeseries[]
    }
    airports: airports
}
export default weatherNowAirport;