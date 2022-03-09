interface terskelData{
    airTempMin: number; // temperatur (air_temperature)
    airTempMax: number; // temperatur (air_temperature)

    precipitationMax: number; // nedbør (precipitation_ammount)
    precipitationMin: number; // nedbør (precipitation_ammount)

    windSpeedMin: number; // vindstyrke (wind_speed)
    windSpeedMax: number; // vindstyrke (wind_speed)

        //windDirection: number; // vindretning (wind_from_direction)
    
    windGustMin: number; // vindkast (wind_speed_of_gust)
    windGustMax: number; // vindkast (wind_speed_of_gust)

    probThunderMin: number; // sannsynlighet torden (probability_of_thunder)
    probThunderMax: number; // sannsynlighet torden (probability_of_thunder)

    //dewpoint: number; // temperatur luftfuktighet kondenserer (dew_point_temperature)
    
    humidityMin: number; // luftfuktighet (relative_humidity)
    humidityMax: number; // luftfuktighet (relative_humidity)

    fog: number; // tåke (fog_area_fraction)

    crosswindMin: number;
    crosswindMax: number;

    // VI SKAL OGSÅ HA IS% OG CROSSWIND MEN DISSE VERDIENE REGNES UT AV temp+fuktighet og v.retning + v.styrke + rullebaneretning

}

export default terskelData;