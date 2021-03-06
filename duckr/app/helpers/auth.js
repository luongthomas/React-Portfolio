import { ref, firebaseAuth } from 'config/constants'
// import firebase from 'firebase'

// returns a promise
export default function auth () {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

export function checkIfAuthed (store) {
  // ignore firebase
  return store.getState().users.isAuthed === true
}

export function logout () {
  return firebaseAuth().signOut()
}

// ref is root database, child is a location
// .set will save the data to the location we specify in the url of the ref we create or by using .child
export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user) // save the user to the child location, returns promise
    .then(() => user)  // returns user object
}

// old way of mocking auth
// export default function auth () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         name: 'Thomas Luong',
//         avatar: 'https://pbs.twimg.com/profile_images/378800000605536525/891a881bde93a1fc3e289528fb859b96_400x400.jpeg',
//         uid: 'luongthomas'
//       })
//     }, 2000)
//   })
// }
