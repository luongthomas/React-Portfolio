import { saveDuck, fetchDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'

// Ducks
function fetchingDuck () {
  return {
    type: FETCHING_DUCK,
  }
}

function fetchingDuckError (error) {
  console.warn(error)
  return {
    type: FETCHING_DUCK_ERROR,
    error: 'Error fetching duck',
  }
}

function fetchingDuckSuccess (duck) {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING,
  }
}

// add duck to state
function addDuck (duck) {
  return {
    type: ADD_DUCK,
    duck,
  }
}

// common pattern.  thunk dispatches multiple updates to store as ajax request makes its way
export function fetchAndHandleDuck (duckId) {
  return function (dispatch, getState) {
    dispatch(fetchingDuck())
    fetchDuck(duckId)
      .then((duck) => dispatch(fetchingDuckSuccess(duck)))
      .catch((error) => dispatch(fetchingDuckError(error)))

  }
}

// will be a thunk, thunk will get getState()
// will be in charge of adding duck to state, closing modal, and adding to usersDucks
// will fan out all the properties to different parts of the state
export function duckFanOut (duck) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveDuck(duck)  // returns duckWithId
      .then((duckWithId) => {
        dispatch(addDuck(duckWithId))
        dispatch(closeModal())
        dispatch(addSingleUsersDuck(uid, duckWithId.duckId))
      })
      .catch((err) => {
        console.warn('Error in duckFanout', err)
      })
  }
}

export function addMultipleDucks (ducks) {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
}

// Ducks
const initialState = {
  isFetching: true, // initially we assume we have no ducks
  error: '',
}

export default function ducks (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_DUCK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      }
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false,
        error: '',
      }

    // return new object w/state mixed with action.ducks, both are objects
    case ADD_MULTIPLE_DUCKS:
      return {
        ...state,
        ...action.ducks,
      }
    default:
      return state
  }
}
