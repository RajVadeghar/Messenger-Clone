import firebase from "firebase";

const firebaseApp = firebase.initializeApp({});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
