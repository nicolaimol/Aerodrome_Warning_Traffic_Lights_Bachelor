import React, {useState} from 'react';
import Test from '../components/Test'
import {flyplass} from '../util/flyplass'
import FlyplassForm from "../components/FlyplassForm";

function Flyplass(props: any) {

    const [flyplass, setFlyplass] = useState<flyplass | null>(null)

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

    return (
        <div style={{width: '100%', display: 'flex', backgroundColor: 'blue', justifyContent: 'center'}}>
            {
                flyplass == null &&
                    <Test changeFlyplass={changeFlyplass} />
            }
            {
                flyplass != null &&
                <FlyplassForm done={showTable} flyplass={flyplass} />
            }

        </div>
    );
}

export default Flyplass;