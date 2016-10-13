import { ref } from 'config/constants' // to interact with DB firebase

// firebase will make random duckId
function saveToDucks (duck) {
  // returns reference to that specific location, since we're not pushing anything
  const duckId = ref.child('ducks').push().key
  // creates brand new object with old duck properties, with new duckId
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  // as the promise is continuing, we return, other functions will run
  return {
    duckId,
    duckPromise,
  }
}

// have duck and duckId so we save to the endpoint, the duck and duckId combined
// pushed to database
function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

// since new duck has no likes, we init the value
function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0)
}

// all functions will run, when done with async req
// returns object with duck and duckId to whatever invoked saveToDucks
export function saveDuck (duck) {
  // rely saveToDucks to give us promise and duckId
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

// the on method, sets up a socket btwn browser and firebase, then do callback when data changes
export function listenToFeed (callback, errorCallBack) {
  // listen to 'ducks' endpoint, on event of change, go ahead
  // snapshot.val gives all values of ducks endpoint
  ref.child('ducks').on('value', (snapshot) => {  // firebase allows you to get data 1by1 or as whole.  value = whole
    const feed = snapshot.val() || {} // if nothing there, then make empty object
    const sortedIds = Object.keys(feed).sort((a, b) =>  // iterate all keys and sort, give back ids sorted by timestamp
      feed[b].timestamp - feed[a].timestamp
    )
    callback({feed, sortedIds}) // callback here will run everytime its setup and if ducks data changes
  }, errorCallBack)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')  // will fetch data once
    .then((snapshot) => snapshot.val() || {}) // returned a callback, will return all data
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true) // sets this endpoint to true
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null) // deletes from firebase
}

// guarantees that there won't be two transactions at once (better than .set())
export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

// thunks to help cache data
export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (duckId, reply) {
  const replyId = ref.child(`replies/${duckId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${duckId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}
