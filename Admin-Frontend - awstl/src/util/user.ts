import axios from 'axios'

export const login = async (username: string, password: string): Promise<string> => {
    const loginDto = {
        username: username,
        password: password
    }

    //const {token, setToken} = useContext(TokenContext)

    console.log(loginDto)

    let loggedIn = await axios.post("/api/user/login", loginDto)
        .then((response: any) => {
            console.log(response)

            return response.data.access_token;
        })
        .catch((error: any) => {
            return null;
        })

    return loggedIn
}