

export const auth = () => {

    fetch("/api/user/auth").then((response: any) => {
        if (response.redirected && response.url.includes("keycloak")) {
            console.log("true")
            window.location.href = response.url;
        } else {
            console.log("false")
        }
    })
}