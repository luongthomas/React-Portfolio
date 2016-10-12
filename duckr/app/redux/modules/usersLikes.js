import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api'

const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

// usersLikes
function fetchingLikes () {
  return {
    type: FETCHING_LIKES,
  }
}

function fetchingLikesError () {
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}

function addLike (duckId) {
  return {
    type: ADD_LIKE,
    duckId,
  }
}

function removeLike (duckId) {
  return {
    type: REMOVE_LIKE,
    duckId,
  }
}

// thunk
export function addAndHandleLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(duckId))   // added like, but if it fails, later remove it

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId),
    ]).catch((error) => {     // if problem, then remove like
      console.warn(error)
      dispatch(removeLike(duckId))
    })
  }
}

// thunk
export function handleDeleteLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(duckId))   // removed like, but if it fails, later add it

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumberOfLikes(duckId),
    ]).catch((error) => {     // if problem, then add like
      console.warn(error)
      dispatch(addLike(duckId))
    })
  }
}

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((error) => dispatch(fetchingLikesError(error)))
  }
}

// usersLikes
const initialState = {
  isFetching: false,
  error: '',
}

export default function usersLikes (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      }
    case ADD_LIKE:
      return {
        ...state,
        [action.duckId]: true,
      }

    // long-winded way to remove a duckid
    // to keep immutability, loop over every duckid in state
    // filter out duckids that match the action one
    // returning array, reduce to get an object
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter((duckId) => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default:
      return state
  }
}
