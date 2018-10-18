import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
              { this.props.store.dispatch(anecdoteVote(anecdote.id))
                const teksti = 'You voted ' + anecdote.content
                this.props.store.dispatch(notificationChange(teksti))
                setTimeout(() => { this.props.store.dispatch(notificationChange('')) }, 5000)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList