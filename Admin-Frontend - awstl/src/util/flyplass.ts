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

    let data = await axios.get("/api/airport")
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

export const oppdaterFlyplass = async (flyplass: flyplass): Promise<any> => {
    let response = await axios.put("/api/airport", flyplass)
    console.log(response)
}