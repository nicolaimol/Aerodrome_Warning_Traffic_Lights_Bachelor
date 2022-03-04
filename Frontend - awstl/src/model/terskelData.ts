interface terskelData{
    airTemp: number; // temperatur (air_temperature)
    precipitationAmmount: number; // nedbør (precipitation_ammount)
    windSpeed: number; // vindstyrke (wind_speed)
    //windDirection: number; // vindretning (wind_from_direction)
    windGust: number; // vindkast (wind_speed_of_gust)
    probThunder: number; // sannsynlighet torden (probability_of_thunder)
    //dewpoint: number; // temperatur luftfuktighet kondenserer (dew_point_temperature)
    humidity: number; // luftfuktighet (relative_humidity)
    fog: number; // tåke (fog_area_fraction)
    
    probIce: number;
    crosswind: number;


    // VI SKAL OGSÅ HA IS% OG CROSSWIND MEN DISSE VERDIENE REGNES UT AV temp+fuktighet og v.retning+v.styrke+rullebaneretning

}

export default terskelData;