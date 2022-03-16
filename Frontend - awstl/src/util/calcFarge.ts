
export const calcFarge = ( data?: any, terskelverdier?: any, flyplass?: any ) => {

    /*
    console.log('Her er terskelverdier fra calcFarge');
    console.log(terskelverdier!!);

    console.log('Her er data fra calcFarge');
    console.log(data!!);
     */

    const green = []
    const yellow = []
    const red = []

    console.log(data!!);
    console.log(terskelverdier!!);
    //console.log(flyplass);


    


    if (data?.air_temperature > terskelverdier?.airTempMax) {
        green.push("air temp")
    } else if (data?.air_temperature < terskelverdier?.airTempMin) {
        red.push("air temp")
    } else {
        yellow.push("air temp")
    }

    // PRECIPITATION SKAL HIT, ER FEIL I KODEN HVOR DET ER PRECIPITATION_RATE ISTEDENFOR PRECIPITATION_AMMOUNT

    if (data?.wind_speed > terskelverdier?.windSpeedMax) {
        red.push("wind speed")
    } else if (data?.wind_speed < terskelverdier?.windSpeedMin) {
        green.push("wind speed")
    } else {
        yellow.push("wind speed")
    }


    if (data?.wind_speed_of_gust > terskelverdier?.windGustMax) {
        red.push("wind gust")
    } else if (data?.wind_speed_of_gust < terskelverdier?.windGustMin) {
        green.push("wind gust")
    } else {
        yellow.push("wind gust")
    }

    // PROBABILITY THUNDER HER

    if (data?.relative_humidity > terskelverdier?.humidityMax) {
        red.push("humidity")
    } else if (data?.relative_humidity < terskelverdier?.humidityMin) {
        green.push("humidity")
    } else {
        yellow.push("humidity")
    }


    const cw = data?.wind_speed * Math.sin
    (   Math.min(
            Math.abs(10*flyplass?.rwy.split("/")[0] - (360 + data?.wind_from_direction)) , 
            Math.abs(10*flyplass?.rwy.split("/")[1] - (360 + data?.wind_from_direction))
        )
    )

    if (cw > terskelverdier?.crosswindMax) {
        red.push("crosswind")
    } else if (cw < terskelverdier?.crosswindMin) {
        green.push("crosswind")
    } else {
        yellow.push("crosswind")
    }

    console.table(green)
    console.table(yellow)
    console.table(red)
    
    if (red.length > 0 || yellow.length >= 4) return "red";
    if (yellow.length > 0) return "yellow";
    return 'green';
}