import timeseriesList from "./timeseriesList";
import weatherNow from "./weatherNow";

interface forecast {
    properties:{
        timeseries: weatherNow[]
    }
}

export default forecast;