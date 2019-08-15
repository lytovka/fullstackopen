import React from 'react'
import { addFilter } from '../reducers/filterReducer'

const Filter = ({store}) => {
  const handleChange = (event) => {
      console.log(event.target.value)
      store.dispatch(addFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter