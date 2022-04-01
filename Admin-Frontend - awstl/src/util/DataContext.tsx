import React, {createContext, useState } from "react";

interface Token {
    token: string,
    setToken: (value: string) => void
}

const tokenInit = ""

const setTokenInit = (value: string) => {

}


const TokenContext = createContext<Token>({token: tokenInit, setToken: setTokenInit})

function TokenContextProvider(props: any) {

    const [token, setToken] =   useState<string>("")

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {props.children}
        </TokenContext.Provider >
    )
}


export {TokenContext, TokenContextProvider}