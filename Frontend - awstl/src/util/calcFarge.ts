
export const calcFarge = ( data?: any, terskelverdier?: any ) => {

    /*
    console.log('Her er terskelverdier fra calcFarge');
    console.log(terskelverdier!!);

    console.log('Her er data fra calcFarge');
    console.log(data!!);
     */

    let analyseArray = [];

    // Sjekk temperatur
    if (data?.air_temperature > terskelverdier?.airTempMin && data?.air_temperature < terskelverdier?.airTempMax) {
        analyseArray.push('yellow');
    } else if (data?.air_temperature < terskelverdier?.airTempMin) {
        return 'red';
    }

    if (analyseArray.length > 0){
        return 'yellow';
    }
    return 'green';
}