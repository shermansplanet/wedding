import { useState } from 'react'
import './App.css'
import Schedule from './Schedule'

export enum Tab {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE', 
  DRESS_CODE = 'DRESS_CODE',
  FAQ = 'FAQ'
} 

function App() {
  const [tab, setTab] = useState<Tab>(Tab.HOME);


  const getContent = (tab: Tab) => {
    switch (tab) {
      case Tab.HOME:
        return <p>Welcome home!</p>;
      case Tab.SCHEDULE:
        return <Schedule/>;
      case Tab.DRESS_CODE: 
        return <p>You are dressing up for the park </p>;
      case Tab.FAQ: 
       return <p>No one has asked me a question yet! </p>;
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0}}>
      <h1>Tara & Loren</h1>
      <div style={{display: 'flex', gap: 16}}>
        <button onClick={() => setTab(Tab.SCHEDULE)}>Schedule</button>
        <button onClick={() => setTab(Tab.DRESS_CODE)}>Dress Code</button>
        <button onClick={() => setTab(Tab.FAQ)}>FAQ</button>
      </div>
      {getContent(tab)}
      <p style={{fontSize: '.7em'}}>
        copyright by Tara & Loren 2024
      </p>
    </div>
  )
}

export default App
