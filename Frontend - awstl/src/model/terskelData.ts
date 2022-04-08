interface terskelData{
    airTempMin: number; // temperatur (air_temperature)
    airTempMax: number; // temperatur (air_temperature)
    airTempActive: boolean;

    precipitationMax: number; // nedbør (precipitation_ammount)
    precipitationMin: number; // nedbør (precipitation_ammount)
    precipitationActive: boolean;

    windSpeedMin: number; // vindstyrke (wind_speed)
    windSpeedMax: number; // vindstyrke (wind_speed)
    windSpeedActive: boolean;

    //windDirection: number; // vindretning (wind_from_direction)
    
    windGustMin: number; // vindkast (wind_speed_of_gust)
    windGustMax: number; // vindkast (wind_speed_of_gust)
    windGustActive: boolean;

    probThunderMin: number; // sannsynlighet torden (probability_of_thunder)
    probThunderMax: number; // sannsynlighet torden (probability_of_thunder)
    probThunderActive: boolean;
    
    //dewpoint: number; // temperatur luftfuktighet kondenserer (dew_point_temperature)
    
    humidityMin: number; // luftfuktighet (relative_humidity)
    humidityMax: number; // luftfuktighet (relative_humidity)
    humidityActive: boolean;

    crosswindMin: number;
    crosswindMax: number;
    crosswindActive: boolean;

    
}

export default terskelData;