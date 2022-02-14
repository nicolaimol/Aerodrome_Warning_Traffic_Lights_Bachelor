import weatherTimeseries from './weatherTimeseries'

interface weatherNow {
    properties: {
        timeseries: weatherTimeseries[]
    }
    

}

export default weatherNow;