import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (store = [], action) => {

  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  case 'CREATE':
    return [...store, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const uusiVote = anecdote.votes + 1
    const updatedAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: uusiVote
    }
    await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
}

export default anecdoteReducer