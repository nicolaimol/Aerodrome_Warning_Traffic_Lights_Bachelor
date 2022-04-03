import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import {hentTerskel} from "../util/terskel";
import TerskelList from "../components/TerskelList";

function Terskel(props: any) {

    const keycloak = useKeycloak()

    const [terskelList, setTerskelList] = useState([])

    useEffect(() => {

        const hent = async () => {
            const data = await hentTerskel(keycloak.keycloak.token!!)
            if (data != null) {
                setTerskelList(data)
            }
        }

        hent();


    }, [])

    const update = (id: string) => {
        setTerskelList((oldList: any) => {
            return oldList.filter((it: any) => it.id != id)
        })
    }

    return (
        <div>
            <TerskelList update={update} list={terskelList} />
        </div>
    );
}

export default Terskel;