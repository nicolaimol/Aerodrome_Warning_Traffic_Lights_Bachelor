import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import {auth} from '../util/auth'

function Hjem(props: any) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const alert = (value: boolean) => {
        setLoggedIn(value)
    }

    useEffect(() => {
        const authenticate = async () => {
            const repsonse = await auth()

            if (repsonse === 200) {
                setLoggedIn(true)
            }
        }

        authenticate()
    }, [])

    return (
        <div style={{backgroundColor: 'green', display: 'flex', justifyContent: 'center', width: '100%'}}>
            {loggedIn ?
                "HJEM"
                :
                <Login alert={alert}/>
            }

        </div>
    );
}

export default Hjem;