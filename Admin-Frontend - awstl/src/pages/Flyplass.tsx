import React, {useContext, useEffect, useState} from 'react';
import Test from '../components/Test'
import {flyplass, hentFlyplasser} from '../util/flyplass'
import FlyplassForm from "../components/FlyplassForm";
import {auth} from '../util/auth'
import { useNavigate} from "react-router";
import {TokenContext} from "../util/DataContext";

function Flyplass(props: any) {

    const navigate = useNavigate()

    const [flyplass, setFlyplass] = useState<flyplass | null>(null)
    const [flyplassList, setFlyplassList] = useState<flyplass[]>([])

    const {token} = useContext(TokenContext)
    useEffect(() => {
        auth(token)
            .then((status: number) => {
                if (status === 401) {
                    navigate("/")
                } else {

                    hentFlyplasser()
                        .then(list => {
                            setFlyplassList(list)
                        })

                }
            })
    }, [])


    const changeFlyplass = (flyplass: flyplass) => {
        setFlyplass(flyplass)
    }

    const showTable = (flyplass: flyplass) => {
        setFlyplassList((oldList: flyplass[]) => {
            return oldList.map((it: flyplass) => {
                if (it.icao === flyplass.icao) {
                    return flyplass
                }

                return it
            })
        })

        setFlyplass(null)
    }

    const avbryt = () => {
        setFlyplass(null)
    }

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            {
                flyplass == null &&
                    <Test list={flyplassList} changeFlyplass={changeFlyplass} />
            }
            {
                flyplass != null &&
                <FlyplassForm done={showTable} cancel={avbryt} flyplass={flyplass} />
            }

        </div>
    );
}

export default Flyplass;