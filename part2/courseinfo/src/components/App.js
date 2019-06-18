import React from 'react'
import Course from './Course'

const App = ({courses}) => {


    const row = () => courses.map((course) => {
        return (
            <Course key={course.id} course={course} />
        )
    });

    return (
        <div>
            {row()}
        </div >
    )

}

export default App