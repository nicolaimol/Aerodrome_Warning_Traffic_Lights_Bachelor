interface weatherTimeseries {
    data:{
        instant:{
            details:{
                air_temperature:number
                wind_from_direction:number
                wind_speed:number
                effective_temperature:number|null

            }
        },
        next_1_hours:{
            summary:{
                symbol_code:string
            },
            details: {
                precipitation_amount: number
            }
        },
        next_6_hours:{
            summary:{
                symbol_code:string
            },
            details: {
                precipitation_amount: number
            }
        },
        next_12_hours:{
            summary:{
                symbol_code:string
            },
            details: {
                precipitation_amount: number
            }
        }
    }

}

export default weatherTimeseries;