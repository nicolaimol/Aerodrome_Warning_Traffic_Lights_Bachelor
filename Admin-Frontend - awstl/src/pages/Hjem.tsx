import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Hjem(props: any) {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1em'}}>
                    <Typography style={{textAlign: 'center', color: '#0494ac'}} variant="h3">
                        Velkommen til admin
                    </Typography>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em'}}>
                        <Card style={{backgroundColor: "#0494ac", color: "white"}}>
                            <Link to="/flyplass" style={{display: 'flex', flexGrow: 1, color: 'white'}}>
                            <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em', width: '100%'}}>
                                <Typography variant="h5">
                                    Flyplass
                                </Typography>
                            </CardContent>
                            </Link>
                        </Card>
                        <Card style={{backgroundColor: "#0494ac", color: "white"}}>
                            <Link to="/terskelverdi" style={{display: 'flex', flexGrow: 1, color: 'white'}}>
                                <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em', width: '100%'}}>
                                    <Typography variant="h5">
                                        Terskelverdier
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
        </div>
    );
}

export default Hjem;