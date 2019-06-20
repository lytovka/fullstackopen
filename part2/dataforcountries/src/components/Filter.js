import React from 'react'

const Filter = ({value, handler}) =>{
    return(
        <>
            <input value={value} onChange={handler} />
        </>
    );
}

export default Filter