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

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (iidee) => {
  return {
    type: 'VOTE',
    data: {
      id: iidee
    }
  }
}

export default anecdoteReducer