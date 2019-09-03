import React from 'react'
import { addFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    console.log(event.target.value)
    props.addFilter(event.target.value)
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

const mapStateToProps = (state) => {
  return{
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  addFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter)