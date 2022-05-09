import { crosswind } from './calcCrosswind';
export const calcFarge = ( data?: any, terskelverdier?: any, flyplass?: any, more?: any ) => {

    if (data === undefined || terskelverdier === undefined || flyplass === undefined) {
        return 'green'
    }


    const green = []
    const yellow = []
    const red = []


    if(terskelverdier.airTempActive){
        if (data?.effective_temperature > terskelverdier?.airTempMax) {
        green.push("air temp")
        } else if (data?.effective_temperature < terskelverdier?.airTempMin) {
            red.push("air temp")
        } else {
            yellow.push("air temp")
        }
    }
    

    if (terskelverdier.precipitationActive){
        if (more.precipitation_amount > terskelverdier?.precipitationMax) {
            red.push("precipitation")
        } else if (more.precipitation_amount < terskelverdier?.precipitationMin || more.precipitation_amount == 0) {
            green.push("precipitation")
        } else {
            yellow.push("precipitation")
        }
    }
    

    if(terskelverdier.windSpeedActive) {
        if (data?.wind_speed > terskelverdier?.windSpeedMax) {
            red.push("wind speed")
        } else if (data?.wind_speed < terskelverdier?.windSpeedMin) {
            green.push("wind speed")
        } else {
            yellow.push("wind speed")
        }
    }

    if (terskelverdier.windGustActive){
        if (data?.wind_speed_of_gust > terskelverdier?.windGustMax) {
            red.push("wind gust")
        } else if (data?.wind_speed_of_gust < terskelverdier?.windGustMin || isNaN(data?.wind_speed_of_gust)) {

            green.push("wind gust")
        } else {
            yellow.push("wind gust")
        }
    }

    if (terskelverdier.probThunderActive){
        if (more.probThunder > terskelverdier?.probThunderMax) {
            red.push("prob thunder")
        } else if (more.probThunder < terskelverdier?.probThunderMin) {
            green.push("prob thunder")
        } else {
            yellow.push("prob thunder")
        }
    }

    if (terskelverdier.humidityActive) {
        if (data?.relative_humidity > terskelverdier?.humidityMax) {
            red.push("humidity")
        } else if (data?.relative_humidity < terskelverdier?.humidityMin) {
            green.push("humidity")
        } else {
            yellow.push("humidity")
        }

    }

    const cw = crosswind(flyplass?.rwy, data?.wind_from_direction, data?.wind_speed);


    if (terskelverdier.crosswindActive) {
        if (cw > terskelverdier?.crosswindMax) {
            red.push("crosswind")
        } else if (cw < terskelverdier?.crosswindMin) {
            green.push("crosswind")
        } else {
            yellow.push("crosswind")
        }
    }

    
    if (red.length > 0 || yellow.length >= 4) return "red";
    if (yellow.length > 0) return "yellow";
    return 'green';
}