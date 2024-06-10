import { useMemo, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get, DatabaseReference } from "firebase/database";
import Rsvp from './Rsvp.tsx'
import './App.css'
import Schedule from './Schedule.tsx';
import Larp from './Larp.tsx';

enum Tabs {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  DRESS_CODE = 'DRESS_CODE',
  FAQ = 'FAQ',
  RSVP = 'RSVP',
  LARP = 'LARP'
}

export type GuestData = {
  names: string[];
  rsvp?: RsvpData[];
  hideLarp?: boolean;
}

export type RsvpData = {
  attending?: boolean;
  dietaryRestrictions: string;
}

function App() {
  const [tab, setTab] = useState<Tabs>(Tabs.RSVP);
  const [passcode, setPasscode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passcodeData, setPasscodeData] = useState<GuestData>();
  const [molting, setMolting] = useState<boolean>();
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
        return <h2>Welcome, {passcodeData?.names.join(", ")}!</h2>;
      case Tabs.SCHEDULE:
        return <Schedule />;
      case Tabs.DRESS_CODE:
        return <p>You are dressing up for the park. More to come later!</p>;
      case Tabs.FAQ:
        return <p>No one has asked us a question yet.</p>;
      case Tabs.LARP:
        return <Larp />;
      case Tabs.RSVP:
        return passcodeData == undefined ? null : <Rsvp guestData={passcodeData} passcode={passcode} />;
    }
  }

  const getHeading = () => <>
    <div className='titleContainer'><h1>Tara & Loren</h1></div>
    <img className='weddingBorder' src='https://raw.githubusercontent.com/shermansplanet/wedding/main/src/assets/wedding-border.png'></img>
  </>;

  if (passcodeData == undefined) {

    if (molting) {
      return (
        <>
          <img src='https://raw.githubusercontent.com/shermansplanet/wedding/main/src/assets/molting-circus.jpg'
            style={{ width: "400px" }} />
          <div className="card">
            {getContent(Tabs.LARP)}
          </div>
        </>
      )
    }

    function getCookie(cname: string): string {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    let cachedPasscode = getCookie("passcode");
    if (cachedPasscode != "") {
      if (cachedPasscode == "molting") {
        setMolting(true);
        return;
      }
      get(child(dbRef, `passcodes/` + cachedPasscode)).then((snapshot) => {
        if (snapshot.exists()) {
          setPasscode(cachedPasscode);
          setPasscodeData(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    return (
      <>
        {getHeading()}
        <div className='navbar' style={{ height: "20px" }} />
        <form className='passcodeContainer' onSubmit={(event) => {
          event.preventDefault();
          return false;
        }}>
          <input value={passcode} placeholder='passcode' onChange={(e) => setPasscode(e.target.value.toLowerCase().trim())}></input>
          <div style={{ height: 16 }} />
          <button onClick={() => {
            document.cookie = "passcode=" + passcode + "; expires=Sun, 25 Aug 2024 12:00:00 UTC";
            if (passcode === "molting") {
              setMolting(true);
              return;
            }
            get(child(dbRef, `passcodes/` + passcode)).then((snapshot) => {
              if (snapshot.exists()) {
                setPasscodeData(snapshot.val())
              } else {
                setError("Couldn't recognize that passcode!");
              }
            }).catch((error) => {
              console.error(error);
            });
          }}>Submit</button>
          <p>{error}</p>
        </form>
      </>
    )
  }

  let hideLarp = passcodeData.hideLarp == true;

  return (
    <>
      {getHeading()}
      <div className='navbar'>
        <button onClick={() => setTab(Tabs.RSVP)}>RSVP</button>
        <button onClick={() => setTab(Tabs.SCHEDULE)}>Schedule</button>
        <button onClick={() => setTab(Tabs.DRESS_CODE)}>Dress Code</button>
        <button onClick={() => setTab(Tabs.FAQ)}>FAQ</button>
        {hideLarp ? null : <button style={{ border: 'none', background: 'none', }} onClick={() => setTab(Tabs.LARP)}>LARP</button>}
      </div>
      <div className="card">
        {getContent(tab)}
      </div>
    </>
  )
}

export default App
