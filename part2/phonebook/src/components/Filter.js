import React from 'react'

const Filter = ({value, handler}) =>{
    
    return(
        <>
            Filter by name: <input value={value} onChange={handler} />
        </>
    );
}

export default Filter