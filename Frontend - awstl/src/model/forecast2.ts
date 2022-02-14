import timeseriesList from "./timeseriesList";
import weatherNow from "./weatherNow";

interface forecast {
    properties:{
        timeseries: timeseriesList[]
    }
}

export default forecast;