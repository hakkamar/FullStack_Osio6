const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.teksti
  default:
    return state
  }
}

export const notificationChange = (teksti) => {
  return {
    type: 'NOTIFICATION',
    teksti
  }
}

export default notificationReducer