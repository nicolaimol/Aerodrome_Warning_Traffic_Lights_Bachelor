import React, {useState} from 'react';
import Login from "../components/Login";

function Hjem(props: any) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const alert = (value: boolean) => {
        console.log(value)
        setLoggedIn(value)
    }

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