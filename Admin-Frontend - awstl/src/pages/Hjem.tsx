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
                            <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em'}}>
                                <Typography variant="h5">
                                    Flyplass
                                </Typography>
                                <Link to="/flyplass">
                                    <Button style={{color: "white"}} variant="text">Velg</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        <Card style={{backgroundColor: "#0494ac", color: "white"}}>
                            <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em'}}>
                                <Typography variant="h5">
                                    Standard Terskelverdi
                                </Typography>
                                <Link to="/terskelverdi">
                                    <Button style={{color: "white"}} variant="text">Velg</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
        </div>
    );
}

export default Hjem;