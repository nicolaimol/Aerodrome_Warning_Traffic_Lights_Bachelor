interface weatherTimeseries {
    data:{
        instant:{
            details:{
                air_temperature:number
                wind_from_direction:number
                wind_speed:number

            }
        },
        next_1_hours:{
            summary:{
                symbol_code:string
            }
        }
    }

}

export default weatherTimeseries;