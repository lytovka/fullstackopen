import React from 'react'

const Person = ({name, number, handler}) =>{
    return(
        <p>{name} {number} <button type="submit" onClick={handler}>delete</button></p>
    );
}

export default Person