import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAKPMem2RGRNW8fZVyQiA4Tr14ZdpRnbT8",
  authDomain: "react-for-bacon.firebaseapp.com",
  databaseURL: "https://react-for-bacon.firebaseio.com",
  projectId: "react-for-bacon",
  storageBucket: "react-for-bacon.appspot.com",
  messagingSenderId: "969286964036"
 };
firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
