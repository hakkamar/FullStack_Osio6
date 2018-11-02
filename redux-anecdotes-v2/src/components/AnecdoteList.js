import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

const aanestys = async (props, anecdote) => {
  props.anecdoteVote(anecdote)

  const teksti = 'You voted ' + anecdote.content
  props.notificationChange(teksti, 5)
}

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    {props.naytettavatAnecdootit.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick= { () => aanestys(props, anecdote)}>
            vote
          </button>
        </div>
      </div>
    )}
  </div>
)

const anecdootit = (anecdotes, filter) => {
  if (filter !== '') {
    return anecdotes.filter(a => a.content.includes(filter))
  }
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    naytettavatAnecdootit: anecdootit(state.anecdotes, state.filter),
    notification: state.notification
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { notificationChange, anecdoteVote }
)(AnecdoteList)

export default ConnectedAnecdoteList