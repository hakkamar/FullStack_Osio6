import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    this.props.filterChange(content)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const ConnectedFilter = connect(
  null,
  { filterChange }
)(Filter)

export default ConnectedFilter