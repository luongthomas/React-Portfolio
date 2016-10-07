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
  }
  ducks: {
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
    [duckId]: {
      lastUpdated,
      error,
      [replyId]: {
        name,
        comment,
        uid,
        timestamp,
        avatar
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
    ducksIds: [duckId, duckId,duckId, duckId]
  }
}
