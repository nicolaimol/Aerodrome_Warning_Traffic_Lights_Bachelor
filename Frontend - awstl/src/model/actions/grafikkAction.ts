import weatherTimeseries from '../weatherTimeseries'

interface iGrafikkAction {
    type: string,
    payload: weatherTimeseries
}

export default iGrafikkAction