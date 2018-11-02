const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.teksti
  default:
    return state
  }
}

export const notificationChange = (teksti, viiveSekuneissa) => {
  const viive = viiveSekuneissa * 1000
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      teksti
    })

    teksti = ''
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        teksti
      })
    }, viive)
  }
}

export default notificationReducer