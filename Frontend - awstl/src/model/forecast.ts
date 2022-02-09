import timeseriesList from "./timeseriesList";

interface forecast {
    properties:{
        timeseries: timeseriesList[]
    }
}

export default forecast;