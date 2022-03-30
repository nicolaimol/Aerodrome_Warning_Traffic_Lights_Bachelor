import React, {useEffect, useState} from 'react';
import Test from '../components/Test'
import {flyplass, hentFlyplasser} from '../util/flyplass'
import FlyplassForm from "../components/FlyplassForm";
import { auth } from '../util/auth'
import { useNavigate} from "react-router";

function Flyplass(props: any) {

    const navigate = useNavigate()

    const [flyplass, setFlyplass] = useState<flyplass | null>(null)
    const [flyplassList, setFlyplassList] = useState<flyplass[]>([])

    useEffect(() => {


        const onStart = async () => {
            const status = await auth()
            //console.log(status)

            if (status === 401) {
                navigate("/")
            } else {
                const list = await hentFlyplasser()

                setFlyplassList(list)
            }




        }

        onStart()

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
        <div style={{width: '100%', display: 'flex', backgroundColor: 'blue', justifyContent: 'center'}}>
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