import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))
    const teksti = 'Created new anecdote: ' + content
    this.props.store.dispatch(notificationChange(teksti))
    setTimeout(() => { this.props.store.dispatch(notificationChange('')) }, 5000)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm