import Keycloak from 'keycloak-js'

// @ts-ignore
const keycloak = new Keycloak({
    url: "/keycloak/auth",
    realm: process.env.REACT_APP_KEYCLOAK_REALM || "awtl",
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT || "awtl-admin",
})

export default keycloak;