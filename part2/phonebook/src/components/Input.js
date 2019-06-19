import React from 'react'

const Input = ({value, handler}) => {
    return (
        <>
            <input value={value} onChange={handler} />
        </>
    );
}

export default Input