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
            return null
        })
    return data
}

export const oppdaterFlyplass = async (flyplass: flyplass, token: string): Promise<any> => {
    const config = {
        headers: {
            Authentication: `Bearer ${token}`
        }
    }

    let response = await axios.put("/api/airport", flyplass, config)
        .then((response: any) => {
            return response.status
        })
        .catch((error: any) => {
            return error.response.status
        })

    return response
}