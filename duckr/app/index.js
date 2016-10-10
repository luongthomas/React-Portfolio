import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import users from 'redux/modules/users'
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/auth'
import { composeWithDevTools} from 'redux-devtools-extension'

// compose allows us to use multiple arguments in the second argument
// thunk allows our ACs to have access to 'dispatch'
// if the extension exists, use it, if not, just use the first arguement
const store = createStore(users, composeWithDevTools(
  applyMiddleware(thunk),
))

// runs everytime we switch routes
function checkAuth(nextState, replace) {
  // if fetching, don't redirect yet
  if (store.getState().isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
