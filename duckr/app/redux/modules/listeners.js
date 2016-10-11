const ADD_LISTENER = 'ADD_LISTENER'

// Listeners
export function addListener (listenerId) {
  return {
    type: ADD_LISTENER,
    listenerId,
  }
}

// take current state but sets listener once
export default function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenersId]: true,
      }
    default:
      return state
  }
}
