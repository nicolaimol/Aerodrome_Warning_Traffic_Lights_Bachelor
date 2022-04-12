import axios from 'axios'

export interface flyplass{
    icao: string,
    navn: string,
    iata: string,
    rwy: string,
    lat: string,
    lon: string,
    altitude: string
}

export const hentFlyplasser = async (): Promise<flyplass[]> => {

    const data = await axios.get("/api/airport")
        .then((response: any) => {
            //console.log(response)
            return response.data
        })
        .catch((error: any) => {
            console.log(error)
            return []
        })
    return data
}

export const leggtilFlyplass = async (flyplass: flyplass, token: string): Promise<any> => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    const response = await axios.post("/api/airport", flyplass, config)
        .then((response: any) => {
            return response.status
        })
        .catch((error: any) => {
            console.log(error.response)
            return error.response.status
        })

    return response
}

export const oppdaterFlyplass = async (flyplass: flyplass, token: string): Promise<any> => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }


    const response = await axios.put("/api/airport", flyplass, config)
        .then((response: any) => {
            return response.status
        })
        .catch((error: any) => {
            return error.response.status
        })

    return response
}

export const slettFlyplass = async (icao: string, token: string): Promise<any> => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        data: {
            icao: icao
        }
    }

    const response = await axios.delete("/api/airport", config)
        .then((response:any) => {
            return response.status
        })
        .catch((error: any) => {
            console.log(error.response)
            return error.response.status
        })

    return response;
}