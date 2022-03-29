import axios from 'axios'

export const login = async (username: string, password: string): Promise<boolean> => {
    const loginDto = {
        username: username,
        password: password
    }

    console.log(loginDto)

    let loggedIn = await axios.post("/api/user/login", loginDto)
        .then((response: any) => {
            console.log(response)
            return true;
        })
        .catch((error: any) => {
            console.log(error)
            return false;
        })

    return loggedIn
}