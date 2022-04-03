import React from 'react';
import { useKeycloak } from "@react-keycloak/web";
import {Typography} from "@mui/material";

function SecureRoute(props: any) {

    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated && (props.role != null ? keycloak.hasRealmRole(props.role) : true);

    return isLoggedIn ? props.children : <Typography variant="h6">Du har ikke tilgang til denne siden</Typography>
}

export default SecureRoute;