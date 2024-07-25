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
        return <div style={{ maxWidth: "760px" }}>
          <img style={{ maxWidth: "100%", zIndex: 0 }}
            src='https://raw.githubusercontent.com/shermansplanet/wedding/main/src/assets/dresscode.jpg' ></img>
        </div>;
      case Tabs.FAQ:
        return <div style={{ maxWidth: "100%", padding: "0px 12%" }}>
          <div style={{ maxWidth: "650px" }}>
            <p><b>How many people will be there?</b></p>
            <p>There will be around 40 guests.</p>
            <br />
            <p><b>Will there be alcohol?</b></p>
            <p>Nope! There will be seasonal aguas frescas.</p>
            <br />
            <p><b>What are the transit options?</b></p>
            <p>If you're coming from out of town, it's best to fly into SFO or OAK airports.
              The wedding venue is a short walk from the 16th Street Mission BART stop, and is on several bus lines.
              The only parking option at the venue is street parking, but there is a <a href="https://californiaparking.com/2351-mission-st/">parking garage</a> a 15-minute walk away. We recommend public transit over driving.</p>
            <br />
            <p><b>Where should we stay?</b></p>
            <p>Hotels in the immediate area are sparse, but there are AirBnBs in the Mission and Potrero Hill neighborhoods. We're happy to answer questions about specific areas, especially if you're new to the city.</p>
            <br />
            <p><b>What are your favorite things to do in the city?</b></p>
            <p>Our favorite restaurants include Spork (Chinatown), Sushi on North Beach, and Chili Cha Cha 2 (Mission). We recommend getting ice cream at Bi-Rite, Swensen's, or Salt & Straw.
              For a fun touristy day, check out the sea lions at Pier 39 then take a stroll around Coit Tower - or wander down Haight Street to Golden Gate Park.</p>
            <br />
            <p><b>Is there a wedding registry?</b></p>
            <p>There is no wedding registry, but there will be a box for thoughtful cards at the wedding.</p>
            <p>You can also venmo @taraliu any amount greater than $1 with the comment "dinner quest," and we will try to have a dinner that costs that exact amount and send you a photo with a review ^-^</p>
            <br />
            <p><b>Will Sharky be there?</b></p>
            <p>Sharky will not be attending. He sends his regrets.</p>
          </div>
        </div>;
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
            style={{ width: "400px" }} ></img>
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
