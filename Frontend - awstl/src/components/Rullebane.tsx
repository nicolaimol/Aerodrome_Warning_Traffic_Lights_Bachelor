import React from 'react';

function Rullebane(props: any) {
    return (
            <div style={{backgroundColor: 'black',
                            color: 'yellow',
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            padding: 5,
                            border: "1px yellow solid",
                            width: 'fit-content',
                            transform: `rotate(${Number(props.rullebane.split("/")[0])*10 - 90}deg)`,
                            }}>
                <div style={{transform: 'rotate(90deg)', width: 'fit-content'}}>
                    {props.rullebane.split("/")[0]}
                </div>
                - - - - - - - - - - - - - - - -
                <div style={{transform: 'rotate(-90deg)', width: 'fit-content'}}>
                    {props.rullebane.split("/")[1]}
                </div>

            </div>
    );
}

export default Rullebane;