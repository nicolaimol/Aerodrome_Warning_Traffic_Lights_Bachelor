interface airports {
    icao:string
    navn:string
    rwy?:rwy[]
}

interface rwy {
    id?: number
    rwy: string
}

export default airports