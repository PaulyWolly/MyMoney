
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAJweSXmnA_hp9g7AB951l9pqUkTyZ8hJY",
  authDomain: "mymoney-6a696.firebaseapp.com",
  projectId: "mymoney-6a696",
  storageBucket: "mymoney-6a696.appspot.com",
  messagingSenderId: "265947919614",
  appId: "1:265947919614:web:c40503069f3f41febba1af"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }