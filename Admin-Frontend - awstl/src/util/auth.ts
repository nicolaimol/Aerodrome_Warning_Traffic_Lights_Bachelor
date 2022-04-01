import axios from 'axios'
import {useContext, useEffect, useState} from "react";
import {TokenContext} from "./DataContext";

export const auth = async (token: string): Promise<number> => {

    const config = {
        headers: {
            Authentication: `Bearer ${token}`
        }
    }

    return axios.get("/api/user/auth")
        .then((response: any) => {
            return response.status
        })
        .catch((error: any) => {
            console.log(error.response)
            return error.response.status
        })

    //return status
}