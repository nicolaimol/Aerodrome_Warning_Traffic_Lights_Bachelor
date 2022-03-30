import axios from 'axios'

export const auth = async (): Promise<number> => {
    let response = await axios.get("/api/user/auth")
        .then((response: any) => {
            return response.status
        })
        .catch((error: any) => {
            console.log(error.response)
            return error.response.status
        })

    console.log(response)
    return response

}