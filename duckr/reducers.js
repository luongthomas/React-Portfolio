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
function users(state = initialState, action) {
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



// Ducks
const initialState = {
  isFetching: true, // initially we assume we have no ducks
  error: '',
};

function ducks(state, action) {
  switch (action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_DUCK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      };
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false,
        error: '',
      };

    // return new object w/state mixed with action.ducks, both are objects
    case ADD_MULTIPLE_DUCK:
      return {
        ...state,
        ...action.ducks,
      };
    default:
      return state;
  }
};

// Feed

const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  duckIdsToAdd: [],
  duckIds: [],
};

function feed(state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        fetching: true,
        error: '',
      };
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      };
    case ADD_NEW_DUCK_ID_TO_FEED:
      return {
        ...state,
        duckIdsToAdd: [action.duckId, ...state.newDucksToAdd],
        duckIds: [],
      };
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      };
    default:
      return state;
  }
};

// listeners
export default function listeners(state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenersId]: true,
      };
    default:
      return state;
  }
}

// modal
const initialState = {
  newDuckText: '',
  isOpen: false,
};

// export default
function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    case UPDATE_DUCK_TEXT:
      return {
        ...state,
        duckText: action.newDuckText,
      };
    default:
      return state;
  }
};

// usersLikes
const initialState = {
  isFetching: false,
  error: '',
};

function usersLikes(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      };
    case ADD_LIKE:
      return {
        ...state,
        [action.duckId]: true,
      };

    // long-winded way to remove a duckid
    // to keep immutability, loop over every duckid in state
    // filter out duckids that match the action one
    // returning array, reduce to get an object
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter((duckId) => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current];
          return prev;
        }, {});
    default:
      return state;
  }
}

// likeCount

function count(state = 0, action) {
  switch (action.type) {
    case ADD_LIKE:
      return state + 1;
    case REMOVE_LIKE:
      return state - 1;
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
};

function likeCount(state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        ...initialState, // mix in initial state since it's what we want
        [action.duckId]: action.count,
      };
    case ADD_LIKE:
    case REMOVE_LIKE:
      return typeof state[action.duckId] === 'undefined'
      ? state
      : {
        ...state,
        [action.duckId]: count(state[action.duckId], action),
      };
    default:
      return state;
  }
};

// usersDucks
function usersDuck(state, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK: {
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId]),
      };
    }
  }
}

const initialState = {
  lastUpdated: 0,
  isFetching: false,
  error: '',
  duckIds: [],
};

function userDucks(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds,
        },
      };
    case ADD_SINGLE_USERS_DUCK:
      return typeof state[action.uid] === 'undefined'
      ? state
      : {
        ...state,
        isFetching: false,
        [action.uid]: usersDucks(state[action.uid], action),
      };
    default:
      return state;
  }
}

// Replies
const initialReply = {
  name: '',
  comment: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
};

function repliesAndLastUpdated(state = initialReply, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      };
  }
}

function duckReplies(state, action) {
  switch (action.type) {
    case ADD_REPLY: {
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      };
    }

    case REMOVE_REPLY: {
      return {
        ...state,
        [action.reply.replyId]: undefined,
      };
    }
  }
}

const initialState = {
  lastUpdated: Date.now(),
  replies: {},
};

function replies(state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    case FETCHING_REPLIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: {
          lastUpdated: action.lastUpdated,
          replies: action.replies,
        },
      };
    case ADD_REPLY:
      return {
        ...state,
      };
    case ADD_REPLY_ERROR:
      return {
        ...state,
        replies: duckReplies(state.replies, action),
      };
    case ADD_REPLY_SUCCESS:
      return {
        ...state,
      };
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action),
      };
    default:
      return state;
  }
}
