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
                            <Link to="/flyplass" style={{display: 'flex'}}>
                            <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em'}}>
                                <Typography variant="h5">
                                    Flyplass
                                </Typography>
                                
                                    <Button style={{color: "white"}} variant="text">Velg</Button>
                                
                            </CardContent>
                            </Link>
                        </Card>
                        <Card style={{backgroundColor: "#0494ac", color: "white"}}>
                            <Link to="/terskelverdi" style={{display: 'flex'}}>
                                <CardContent style={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '1em'}}>
                                    <Typography variant="h5">
                                        Terskelverdier
                                    </Typography>
                                    
                                        <Button style={{color: "white"}} variant="text">Velg</Button>
                                    
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
        </div>
    );
}

export default Hjem;