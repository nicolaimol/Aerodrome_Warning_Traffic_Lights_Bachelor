import axios from "axios";

export const hentTerskel = async (token: string) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    let response = await axios.put("/api/terskel/all", config)
        .then((response: any) => {
            console.log(response.data)
            return response.data
        })
        .catch((error: any) => {
            console.log(error)
            return null
        })

    return response


}