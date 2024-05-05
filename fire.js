import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyB0NBRt5oi1WcOLX5njGL1E3m1VSYT_ZF0",
    authDomain: "tara-and-loren.firebaseapp.com",
    databaseURL: "https://tara-and-loren-default-rtdb.firebaseio.com",
    projectId: "tara-and-loren",
    storageBucket: "tara-and-loren.appspot.com",
    messagingSenderId: "895589907035",
    appId: "1:895589907035:web:093b39bcd6cd2493c09d7e"
};
firebase.initializeApp(config);
export default firebase;