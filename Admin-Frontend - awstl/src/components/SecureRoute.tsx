import React from 'react';
import { useKeycloak } from "@react-keycloak/web";
import {Typography} from "@mui/material";

function SecureRoute(props: any) {

    const { keycloak } = useKeycloak();

    let isLoggedIn = keycloak.authenticated 
    let hasRole = false;

    for (const role in props.role) {
        console.log(role)
        console.log(keycloak.hasRealmRole(role))
        hasRole = (hasRole || keycloak.hasRealmRole(role));
    }
    
    isLoggedIn = isLoggedIn && hasRole;


    return isLoggedIn ? props.children : <Typography variant="h6">Du har ikke tilgang til denne siden</Typography>
}

export default SecureRoute;