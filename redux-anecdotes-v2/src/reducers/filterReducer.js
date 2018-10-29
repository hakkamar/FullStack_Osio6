const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.teksti
  default:
    return state
  }
}

export const filterChange = (teksti) => {
  return {
    type: 'SET_FILTER',
    teksti
  }
}

export default filterReducer