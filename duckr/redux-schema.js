// this schema is built up of all the initialStates of the reducers
{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },
  modal: {
    duck,
    isOpen
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      error
      info: {
        avatar
        duckId
        name
        text
        timestamp
        uid
      }
    }
  },
  userDucks: {
    lastUpdated,
    error
    [uid]: {
      duckIds: [duckId, duckId, duckId]
    }
  },
  likeCount: {
    [duckId]: 0
  },
  usersLikes: {
    [duckId]: true
  },
  replies: {
    lastUpdated,
    [duckId]: {
      error,
      [replyId]: {
        name,
        comment,
        uid,
        timestamp,
        avatar,
        replyId,
      }
    }
  },
  listeners: {
    [listenersId]: true
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    duckIdsToAdd: [  ],
    duckIds: [duckId, duckId,duckId, duckId]
  }
}
