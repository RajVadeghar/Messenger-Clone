import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // Paste your firebase config stuff
  apiKey: "AIzaSyDT25AZK-wSC4g1dnNnyod4ynsjMvLjiWI",
  authDomain: "facebook-messenger-clone-a6969.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-a6969.firebaseio.com",
  projectId: "facebook-messenger-clone-a6969",
  storageBucket: "facebook-messenger-clone-a6969.appspot.com",
  messagingSenderId: "341241503977",
  appId: "1:341241503977:web:83bf8e8a29d16207f6d078",
  measurementId: "G-MTPT2Q06WH",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
