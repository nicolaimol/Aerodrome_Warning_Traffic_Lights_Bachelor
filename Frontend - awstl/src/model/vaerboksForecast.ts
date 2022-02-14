import timeseriesList from "./timeseriesList";
import weatherNow from "./weatherNow";
import airports from './airports';

interface vaerboksForecast {
    airports: airports[]
    nowcasts: weatherNow[]
    
}

export default vaerboksForecast;