import React, {useState} from 'react';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {login} from '../util/user'

function Login(props: any) {

    const [username, setUsername] = useState<string>("")
    const usernameChange = (e: any) =>{
        setUsername(e.target.value)
    }
    const [password, setPassword] = useState<string>("")
    const passwordChange = (e: any) =>{
        setPassword(e.target.value)
    }

    const [feil, setFeil] = useState<string>("")

    const click = async () => {
        const loggedIn = await login(username, password)
        if (!loggedIn) {
            setFeil("Brukernavn eller passord er feil")
        }
        props.alert(loggedIn)
    }

    return (
        <Card style={{minWidth: 'fit-content', width: "50%", height: '40vh', minHeight: 'fit-content'}} sx={{padding: 5}}>
            <CardContent style={{display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', alignItems: 'space-between'}} >
                <Typography gutterBottom variant="h5" component="div">
                    Logg inn
                </Typography>
                <Typography variant="h6" >
                    <LockOutlinedIcon />
                </Typography>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly'}}>
                    <TextField onChange={usernameChange} value={username} id="standard-required" label="Brukernavn" variant="standard" />
                    <TextField onChange={passwordChange} value={password} id="standard-required" label="Passord" variant="standard" type="password"/>
                </div>
                <div style={{display: "flex", alignItems:'center', justifyContent: 'space-between'}}>
                    <Button onClick={click} style={{width: 'fit-content'}} variant="outlined">Logg in</Button>
                    <Typography style={{color:'red'}} >Her kommer feil</Typography>
                </div>

            </CardContent>
        </Card>

    );
}

export default Login;