import { calcFarge } from '../calcFarge';

    const dataGreen = {
        cloud_area_fraction_high: 99.1,
        wind_speed_percentile_10: 1.7,
        wind_speed_of_gust: 5.6,
        cloud_area_fraction: 99.3,
        cloud_area_fraction_medium: 32.6,
        air_temperature_percentile_90: 11.6,
        wind_from_direction: 175.5,
        air_temperature: 10.8,
        ultraviolet_index_clear_sky: 2.7,
        air_temperature_percentile_10: 10.1,
        fog_area_fraction: 0,
        air_pressure_at_sea_level: 1021.6,
        wind_speed: 1.8,
        wind_speed_percentile_90: 2.6,
        cloud_area_fraction_low: 0,
        relative_humidity: 33.2,
        dew_point_temperature: -6.6
    }

    const terskelverdier = {
        airTempMin: -10,
        airTempMax: 3,
        airTempActive: true,

        precipitationMin: 0,
        precipitationMax: 1,
        precipitationActive: true,

        windSpeedMin: 15,
        windSpeedMax: 25,
        windSpeedActive: true,

        windGustMin: 20,
        windGustMax: 30,
        windGustActive: true,

        probThunderMin: 20,
        probThunderMax: 40,
        probThunderActive: true,
        
        humidityMin: 90,
        humidityMax: 98,
        humidityActive: true,

        crosswindMin: 7,
        crosswindMax: 15,
        crosswindActive: true
    }

    const flyplass = {
        icao: "ENGM",
        navn: "Oslo lufthavn, Gardermoen",
        rwy: "01/19"
    }

    const moreGreen = {
        probThunder: 0,
        precipitation_amount: 0  
    }

    const thisIsUndefined = undefined;

test('Tester undefined som skal bli green', () => {

    // Tester Undefined
    expect (calcFarge(thisIsUndefined, terskelverdier, flyplass, moreGreen)).toBe('green');

})

test ('Tester alt som blir green', () => {

    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreGreen)).toBe('green');

})

test ('Tester temperatur yellow', () => {

    const nyData = {
        ...dataGreen,
        air_temperature: 0,
    }
    
    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('yellow');
})

test ('Tester temperatur red', () => {

    const nyData = {
        ...dataGreen,
        air_temperature: -15,
    }
    
    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('red');
})

test ('Tester vindfart yellow', () => {

    const nyData = {
        ...dataGreen,
        wind_speed: 20,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('yellow');
})

test ('Tester vindfart red', () => {

    const nyData = {
        ...dataGreen,
        wind_speed: 30,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('red');
})

test ('Tester vindkast yellow', () => {

    const nyData = {
        ...dataGreen,
        wind_speed_of_gust: 25,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('yellow');

})

test ('Tester vindkast red', () => {

    const nyData = {
        ...dataGreen,
        wind_speed_of_gust: 35,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('red');

})

test('Tester humidity yellow', () => {

    const nyData = {
        ...dataGreen,
        relative_humidity: 94,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('yellow');

})

test('Tester humidity red', () => {

    const nyData = {
        ...dataGreen,
        relative_humidity: 99,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('red');

})

test ('Tester crosswind red', () => {

    const nyData = {
        ...dataGreen,
        wind_speed: 60,
    }

    expect (calcFarge(nyData, terskelverdier, flyplass, moreGreen)).toBe('red');

})

test ('Tester precipitation yellow', () => {

    const nyData = {
        ...moreGreen,
        precipitation_amount: 0.5,
    }

    expect (calcFarge(dataGreen, terskelverdier, flyplass, nyData)).toBe('yellow');

})

test ('Tester precipitation red', () => {

    const nyData = {
        ...moreGreen,
        precipitation_amount: 2,
    }

    expect (calcFarge(dataGreen, terskelverdier, flyplass, nyData)).toBe('red');
})

test ('Tester thunder yellow', () => {

    const nyData = {
        ...moreGreen,
        probThunder: 30,
    }
    
    expect (calcFarge(dataGreen, terskelverdier, flyplass, nyData)).toBe('yellow');
})

test ('Tester thunder red', () => {

    const nyData = {
        ...moreGreen,
        probThunder: 50,
    }

    expect (calcFarge(dataGreen, terskelverdier, flyplass, nyData)).toBe('red');
})

