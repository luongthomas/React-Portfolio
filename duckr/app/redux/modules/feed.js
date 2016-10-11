import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'redux/modules/ducks'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

// Feed
function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError (error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

function settingFeedListenerSuccess (duckIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
}

function addNewDuckIdToFeed (duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId,
  }
}

export function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return    // if already set, don't do reset it up, just stop
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())
    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultipleDucks(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds)) // listener is not set yet, set it up
        : dispatch(addNewDuckIdToFeed(sortedIds[0]))  // if listener already set, just add newest duck
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))  // if duckIds not passed to feed, then errors
  }
}

// Feed

const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  newDucksToAdd: [],
  duckIds: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        fetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      }

    // Mix in new duckId from action, and other ducks in queue
    case ADD_NEW_DUCK_ID_TO_FEED:
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
        newDucksAvailable: true,
      }

    // add all queued new ducks into the feed
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      }
    default:
      return state
  }
}
