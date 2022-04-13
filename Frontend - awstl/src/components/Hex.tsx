import React from 'react';

function Hex(props: any) {
    return (
        <span style={{
            backgroundImage: props.color === 'red' ? "url('oct_red.svg')" : "url('oct_yellow.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '25px',
            height: '25px',
            color: props.color === 'red' ? 'white' : 'black',
            fontSize: '20px',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.5em'}}><span style={{
                    transform: props.color === 'red'
                        ? 'translateX(-6%) translateY(5%)'
                        : 'translateX(-6%) translateY(15%)'}}>!</span></span>
    );
}

export default Hex;