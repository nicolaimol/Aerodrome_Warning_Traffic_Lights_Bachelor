import { crosswind } from './calcCrosswind';
export const calcFarge = ( data?: any, terskelverdier?: any, flyplass?: any, more?: any ) => {

    if (data === undefined || terskelverdier === undefined || flyplass === undefined) {
        return 'green'
    }


    const green = []
    const yellow = []
    const red = []

    //console.log(terskelverdier!!);


    if(terskelverdier.airTempActive){
        if (data?.air_temperature > terskelverdier?.airTempMax) {
        green.push("air temp")
        } else if (data?.air_temperature < terskelverdier?.airTempMin) {
            //console.log("air temp", data?.air_temperature)
            red.push("air temp")
        } else {
            yellow.push("air temp")
        }
    }
    

    if (terskelverdier.precipitationActive){
        if (more.precipitation_amount > terskelverdier?.precipitationMax) {
            //console.log("precipitation", data?.precipitation_amount)
            red.push("precipitation")
        } else if (more.precipitation_amount < terskelverdier?.precipitationMin || more.precipitation_amount == 0) {
            green.push("precipitation")
        } else {
            yellow.push("precipitation")
        }
    }
    

    if(terskelverdier.windSpeedActive) {
        if (data?.wind_speed > terskelverdier?.windSpeedMax) {
            //console.log("wind speed", data?.wind_speed)
            red.push("wind speed")
        } else if (data?.wind_speed < terskelverdier?.windSpeedMin) {
            green.push("wind speed")
        } else {
            yellow.push("wind speed")
        }
    }

    if (terskelverdier.windGustActive){
        if (data?.wind_speed_of_gust > terskelverdier?.windGustMax) {
            //console.log("wind speed of gust", data?.wind_speed_of_gust)
            red.push("wind gust")
        } else if (data?.wind_speed_of_gust < terskelverdier?.windGustMin || isNaN(data?.wind_speed_of_gust)) {

            green.push("wind gust")
        } else {
            //console.log("wind speed of gust", data?.wind_speed_of_gust)
            yellow.push("wind gust")
        }
    }

    if (terskelverdier.probThunderActive){
        if (more.probThunder > terskelverdier?.probThunderMax) {
            //console.log("prob thunder", more.probThunder)
            red.push("prob thunder")
        } else if (more.probThunder < terskelverdier?.probThunderMin) {
            green.push("prob thunder")
        } else {
            yellow.push("prob thunder")
        }
    }

    if (terskelverdier.humidityActive) {
        if (data?.relative_humidity > terskelverdier?.humidityMax) {
            //console.log("humidity", data?.relative_humidity)
            red.push("humidity")
        } else if (data?.relative_humidity < terskelverdier?.humidityMin) {
            green.push("humidity")
        } else {
            yellow.push("humidity")
        }

    }

    /*
    const windDir = data?.wind_from_direction > 0 ?
        data?.wind_from_direction :
        360 + data?.wind_from_direction

    const rwyDiff1 = Math.abs(10*Number(flyplass?.rwy?.split("/")[0]) - windDir)
    const rwyDiff2 = Math.abs(10*Number(flyplass?.rwy?.split("/")[1]) - windDir)

    const cw = data?.wind_speed * Math.sin
    (   (Math.min(
        rwyDiff1 ,
        rwyDiff2
    ) / 360) * 2 * Math.PI
    )
    */

    const cw = crosswind(flyplass?.rwy, data?.wind_from_direction, data?.wind_speed);


    if (terskelverdier.crosswindActive) {
        if (cw > terskelverdier?.crosswindMax) {
            //console.log("crosswind", cw)
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