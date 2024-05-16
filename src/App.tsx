import { useMemo, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get, DatabaseReference } from "firebase/database";
import './App.css'

enum Tabs {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  DRESS_CODE = 'DRESS_CODE',
  FAQ = 'FAQ'
}

type GuestData = {
  name: string;
}

function App() {
  const [tab, setTab] = useState<Tabs>(Tabs.HOME);
  const [passcode, setPasscode] = useState<string>("");
  const [passcodeData, setPasscodeData] = useState<GuestData>();
  let app: FirebaseApp;
  let dbRef: DatabaseReference;

  [app, dbRef] = useMemo(() => {
    const config = {
      apiKey: "AIzaSyB0NBRt5oi1WcOLX5njGL1E3m1VSYT_ZF0",
      authDomain: "tara-and-loren.firebaseapp.com",
      databaseURL: "https://tara-and-loren-default-rtdb.firebaseio.com",
      projectId: "tara-and-loren",
      storageBucket: "tara-and-loren.appspot.com",
      messagingSenderId: "895589907035",
      appId: "1:895589907035:web:093b39bcd6cd2493c09d7e"
    };
    app = initializeApp(config);
    dbRef = ref(getDatabase(app));
    return [app, dbRef];
  }, [])

  const getContent = (tab: Tabs) => {
    switch (tab) {
      case Tabs.HOME:
        return <h2>Welcome, {passcodeData?.name}!</h2>;
      case Tabs.SCHEDULE:
        return <p>The wedding starts at 5pm ? </p>;
      case Tabs.DRESS_CODE:
        return <p>You are dressing up for the park </p>;
      case Tabs.FAQ:
        return <p>No one has asked me a question yet. </p>;
    }
  }

  const getHeading = () => <>
    <div className='titleContainer'><h1>Tara & Loren</h1></div>
    <img className='weddingBorder' src='https://raw.githubusercontent.com/shermansplanet/wedding/main/src/assets/wedding-border.png'></img>
  </>;

  if (passcodeData == undefined) {
    return (
      <>
        {getHeading()}
        <div className='navbar' style={{ height: "20px" }} />
        <form className='passcodeContainer' onSubmit={(event) => {
          event.preventDefault();
          return false;
        }}>
          <input value={passcode} placeholder='passcode' onChange={(e) => setPasscode(e.target.value)}></input>
          <div style={{ height: 16 }} />
          <button onClick={() => {
            get(child(dbRef, `passcodes/` + passcode.toLowerCase())).then((snapshot) => {
              if (snapshot.exists()) {
                setPasscodeData(snapshot.val())
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
          }}>Submit</button>
        </form>
      </>
    )
  }

  return (
    <>
      {getHeading()}
      <div className='navbar'>
        <button style={{ border: 'none', background: 'none', }} onClick={() => setTab(Tabs.SCHEDULE)}>Schedule</button>
        <button style={{ border: 'none', background: 'none', }} onClick={() => setTab(Tabs.DRESS_CODE)}>Dress Code</button>
        <button style={{ border: 'none', background: 'none', }} onClick={() => setTab(Tabs.FAQ)}>FAQ</button>
      </div>
      <div className="card">
        {getContent(tab)}
      </div>
    </>
  )
}

export default App
