
    export interface Geometry {
        type: string;
        coordinates: number[];
    }

    export interface Units {
        cloud_area_fraction_high: string;
        wind_speed_percentile_10: string;
        wind_speed_of_gust: string;
        precipitation_amount: string;
        cloud_area_fraction: string;
        cloud_area_fraction_medium: string;
        precipitation_amount_min: string;
        air_temperature_percentile_90: string;
        wind_from_direction: string;
        air_temperature_min: string;
        precipitation_amount_max: string;
        air_temperature: string;
        ultraviolet_index_clear_sky: string;
        air_temperature_percentile_10: string;
        fog_area_fraction: string;
        air_temperature_max: string;
        probability_of_thunder: string;
        air_pressure_at_sea_level: string;
        wind_speed: string;
        wind_speed_percentile_90: string;
        cloud_area_fraction_low: string;
        relative_humidity: string;
        probability_of_precipitation: string;
        dew_point_temperature: string;
    }

    export interface Meta {
        updated_at: Date;
        units: Units;
    }

    export interface Details {
        cloud_area_fraction_high: number;
        wind_speed_percentile_10: number;
        wind_speed_of_gust: number;
        cloud_area_fraction: number;
        cloud_area_fraction_medium: number;
        air_temperature_percentile_90: number;
        wind_from_direction: number;
        air_temperature: number;
        ultraviolet_index_clear_sky: number;
        air_temperature_percentile_10: number;
        fog_area_fraction: number;
        air_pressure_at_sea_level: number;
        wind_speed: number;
        wind_speed_percentile_90: number;
        cloud_area_fraction_low: number;
        relative_humidity: number;
        dew_point_temperature: number;
        effective_temperature: number|null;
    }

    export interface Instant {
        details: Details;
    }

    export interface Summary {
        symbol_code: string;
    }

    export interface Details2 {
        precipitation_amount_max: number;
        probability_of_thunder: number;
        precipitation_amount: number;
        precipitation_amount_min: number;
        probability_of_precipitation: number;
    }

    export interface Next1Hours {
        summary: Summary;
        details: Details2;
    }

    export interface Summary2 {
        symbol_code: string;
    }

    export interface Details3 {
        precipitation_amount_max: number;
        air_temperature_max: number;
        precipitation_amount: number;
        precipitation_amount_min: number;
        probability_of_precipitation: number;
        air_temperature_min: number;
    }

    export interface Next6Hours {
        summary: Summary2;
        details: Details3;
    }

    export interface Summary3 {
        symbol_code: string;
    }

    export interface Details4 {
        probability_of_precipitation: number;
    }

    export interface Next12Hours {
        summary: Summary3;
        details: Details4;
    }

    export interface Data {
        instant: Instant;
        next_1_hours: Next1Hours;
        next_6_hours: Next6Hours;
        next_12_hours: Next12Hours;
    }

    export interface Timesery {
        time: Date;
        data: Data;
    }

    export interface Properties {
        meta: Meta;
        timeseries: Timesery[];
    }

    export interface LocationForecast {
        type: string;
        geometry: Geometry;
        properties: Properties;
    }

