import React from 'react'
import Filter from './Filter'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    var anecdotes = this.props.store.getState().anecdotes
    const filtteri = this.props.store.getState().filter
    if (filtteri !== '') {
      anecdotes = anecdotes.filter(a => a.content.includes(filtteri))
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
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