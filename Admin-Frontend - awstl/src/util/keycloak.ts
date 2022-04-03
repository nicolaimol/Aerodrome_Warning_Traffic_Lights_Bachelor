import Keycloak from 'keycloak-js'

// @ts-ignore
const keycloak = new Keycloak({
    url: "/keycloak/auth",
    realm: 'awtl',
    clientId: 'test'
})

export default keycloak;