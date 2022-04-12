import { calcFarge } from '../calcFarge';


test('calcfarge expect green', () => {

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

    const dataYellowTemp = {
        cloud_area_fraction_high: 99.1,
        wind_speed_percentile_10: 1.7,
        wind_speed_of_gust: 5.6,
        cloud_area_fraction: 99.3,
        cloud_area_fraction_medium: 32.6,
        air_temperature_percentile_90: 11.6,
        wind_from_direction: 175.5,
        air_temperature: 0,
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

    const dataRedTemp = {
        cloud_area_fraction_high: 99.1,
        wind_speed_percentile_10: 1.7,
        wind_speed_of_gust: 5.6,
        cloud_area_fraction: 99.3,
        cloud_area_fraction_medium: 32.6,
        air_temperature_percentile_90: 11.6,
        wind_from_direction: 175.5,
        air_temperature: -15,
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

    const dataYellowWindSpeed = {
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
        wind_speed: 20,
        wind_speed_percentile_90: 2.6,
        cloud_area_fraction_low: 0,
        relative_humidity: 33.2,
        dew_point_temperature: -6.6
    }

    const dataRedWindSpeed = {
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
        wind_speed: 30,
        wind_speed_percentile_90: 2.6,
        cloud_area_fraction_low: 0,
        relative_humidity: 33.2,
        dew_point_temperature: -6.6
    }

    const dataYellowWindGust = {
        cloud_area_fraction_high: 99.1,
        wind_speed_percentile_10: 1.7,
        wind_speed_of_gust: 25,
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

    const dataRedWindGust = {
        cloud_area_fraction_high: 99.1,
        wind_speed_percentile_10: 1.7,
        wind_speed_of_gust: 35,
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

    const dataYellowHum = {
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
        relative_humidity: 94,
        dew_point_temperature: -6.6
    }

    const dataRedHum = {
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
        relative_humidity: 99,
        dew_point_temperature: -6.6
    }

    const dataRedWindSpeedCrazy = {
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
        wind_speed: 60,
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

    const moreYellowPrec = {
        probThunder: 0,
        precipitation_amount: 0.5  
    }

    const moreRedPrec = {
        probThunder: 0,
        precipitation_amount: 2  
    }

    const moreYellowThun = {
        probThunder: 30,
        precipitation_amount: 0  
    }

    const moreRedThun = {
        probThunder: 50,
        precipitation_amount: 0  
    }

    const thisIsUndefined = undefined;

    // Tester Temperatur
    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreGreen)).toBe('green');
    expect (calcFarge(dataYellowTemp, terskelverdier, flyplass, moreGreen)).toBe('yellow');
    expect (calcFarge(dataRedTemp, terskelverdier, flyplass, moreGreen)).toBe('red');

    // Tester Vindfart
    expect (calcFarge(dataYellowWindSpeed, terskelverdier, flyplass, moreGreen)).toBe('yellow');
    expect (calcFarge(dataRedWindSpeed, terskelverdier, flyplass, moreGreen)).toBe('red');

    // Tester Vindkast
    expect (calcFarge(dataYellowWindGust, terskelverdier, flyplass, moreGreen)).toBe('yellow');
    expect (calcFarge(dataRedWindGust, terskelverdier, flyplass, moreGreen)).toBe('red');

    // Tester Humidity
    expect (calcFarge(dataYellowHum, terskelverdier, flyplass, moreGreen)).toBe('yellow');
    expect (calcFarge(dataRedHum, terskelverdier, flyplass, moreGreen)).toBe('red');

    // Tester Precipitation
    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreYellowPrec)).toBe('yellow');
    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreRedPrec)).toBe('red');

    // Tester Thunder
    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreYellowThun)).toBe('yellow');
    expect (calcFarge(dataGreen, terskelverdier, flyplass, moreRedThun)).toBe('red');

    // Gidder ikke regne ut, men tvinger rød crosswind triger med crazy vindfart
    expect (calcFarge(dataRedWindSpeedCrazy, terskelverdier, flyplass, moreGreen)).toBe('red');

    // Tester Undefined
    expect (calcFarge(thisIsUndefined, terskelverdier, flyplass, moreGreen)).toBe('green');


})