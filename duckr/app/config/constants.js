import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA6PNrnl85-2j2RkP7aV1QO_DpFViCY8cc",
  authDomain: "duckr-203df.firebaseapp.com",
  databaseURL: "https://duckr-203df.firebaseio.com",
  storageBucket: "duckr-203df.appspot.com",
  messagingSenderId: "327759601818"
}


firebase.initializeApp(config)

// ref allows us to interact with our database (save, push, delete)
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
