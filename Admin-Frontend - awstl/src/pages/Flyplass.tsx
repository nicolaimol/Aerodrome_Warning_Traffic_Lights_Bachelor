import React, {useEffect, useState} from 'react';
import FlyplassList from '../components/FlyplassList'
import {flyplass, hentFlyplasser} from '../util/flyplass'
import FlyplassForm from "../components/FlyplassForm";

function Flyplass(props: any) {


    const [flyplass, setFlyplass] = useState<flyplass | null>(null)
    const [flyplassList, setFlyplassList] = useState<flyplass[]>([])

    useEffect(() => {

        hentFlyplasser().then((response: any) => {
            setFlyplassList(response)
        })
    }, [])


    const changeFlyplass = (flyplass: flyplass) => {
        setFlyplass(flyplass)
    }

    const slett = (icao: string) => {
        setFlyplassList((oldList: flyplass[]) => {
            return oldList.filter((it: flyplass) => it.icao !== icao)
        })
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
                flyplass == null && flyplassList != null &&
                    <FlyplassList list={flyplassList} changeFlyplass={changeFlyplass} slett={slett} />
            }
            {
                flyplass != null &&
                <FlyplassForm done={showTable} cancel={avbryt} flyplass={flyplass} />
            }

        </div>
    );
}

export default Flyplass;