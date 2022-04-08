import axios from "axios";


export const auth = () => {

    /*
    const config = {
        maxRedirects: 1,
        redirect: 'manual',
    };
    axios.get("/api/user/auth", config)
        .then((response: any) => {
            console.log(response)
        })

     */



    fetch("/api/user/auth",
        {headers:
                {
                    test: "test",
                    redirect_url: "/admin"
                }
        }).then((response: any) => {
        if (response.redirected && response.url.includes("keycloak")) {
            console.log("true")
            window.location.href = response.url;
        } else {
            console.log("false")
        }
    })
}