import React from 'react'

const country = ({name, number, handler}) =>{
    return(
        <>
        <br/>
        <span>{name} {number}</span>
        <button type="submit" onClick={handler}>show</button>
        </>
    );
}

export default country