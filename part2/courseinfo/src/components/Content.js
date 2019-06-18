import React from 'react'
import Part from './Part'
import Total from './Total'


const Content = ({parts}) => {

    const mappedParts = () => parts.map((part) => {
        return (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
    }
    );

    const total = parts.map(part => {
        return part.exercises
    })
        .reduce((a, b) => {
            return a + b
        }, 0);

    return (
        <>
            {mappedParts()}
            <Total total={total} />
        </>
    )
}

export default Content