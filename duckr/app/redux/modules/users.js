import auth, { logout } from 'helpers/auth'

// coincides with action types,
// there are times where we want to export these for other reducers to use
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'


// Users, action creators
function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: error,
  }
}

function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  }
}

// use thunk from redux-thunk
// use applyMiddleware from redux
// thunk is middleware between action and moment when it reaches reducer
// We are keeping all ACs locally scoped to their file
// thunk allows our ACs to have access to 'dispatch'
export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then((user) => {   // return a promise for handleAuth
      // console.log('USER', user)
      dispatch(fetchingUserSuccess(user.uid, user, Date.now()))
      dispatch(authUser(user.uid))
    })
    .catch(() => dispatch(fetchingUserFailure(error)))
  }
}


export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser)
  }
}


// Users
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
};

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      };
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
};

// first time it is called, state is empty, if so, use inital state
export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    // if user doesn't exist in firebase, check null
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          error: '',
          isFetching: false,
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        };
    default:
      return state;
  }
}
