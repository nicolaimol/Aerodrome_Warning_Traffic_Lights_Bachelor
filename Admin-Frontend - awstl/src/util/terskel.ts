import axios from "axios";

export const hentTerskel = async (token: string) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    const response = await axios.get("/api/terskel/all", config)
        .then((response: any) => {
            //console.log(response.data)
            return response.data
        })
        .catch((error: any) => {
            console.log(error)
            return null
        })

    return response


}

export const slettTerskel = async (id: string, token: string) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        data: {
            id: id
        }
    }

    const response = await axios.delete("/api/terskel/", config)
        .then((response: any) => {
            console.log(response.status)
            return response.status
        })
        .catch((error: any) => {
            console.log(error.response.status)
            return error.response.status
        })

    return response
}