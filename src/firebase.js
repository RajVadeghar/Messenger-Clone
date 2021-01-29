import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // Paste your firebase config stuff
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
