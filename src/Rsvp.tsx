import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get } from "firebase/database";

function Rsvp() {
    const config = {
        apiKey: "AIzaSyB0NBRt5oi1WcOLX5njGL1E3m1VSYT_ZF0",
        authDomain: "tara-and-loren.firebaseapp.com",
        databaseURL: "https://tara-and-loren-default-rtdb.firebaseio.com",
        projectId: "tara-and-loren",
        storageBucket: "tara-and-loren.appspot.com",
        messagingSenderId: "895589907035",
        appId: "1:895589907035:web:093b39bcd6cd2493c09d7e"
    };
    const app = initializeApp(config);
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `testkey`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return "TEST"
}

export default Rsvp
