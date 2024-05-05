import { useState } from 'react'
import './App.css'

enum Tabs {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE', 
  DRESS_CODE = 'DRESS_CODE',
  FAQ = 'FAQ'
} 

function App() {
  const [count, setCount] = useState(0)
  const [tab, setTab] = useState<Tabs>(Tabs.HOME);


  const getContent = (tab: Tabs) => {
    switch (tab) {
      case Tabs.HOME:
        return <p>Welcome home!</p>;
      case Tabs.SCHEDULE:
        return <p>The wedding starts at 5pm ? </p>;
      case Tabs.DRESS_CODE: 
        return <p>You are dressing up for the park </p>;
      case Tabs.FAQ: 
       return <p>No one has asked me a question yet. </p>;
    }
  }

  return (
    <>
      <h1>Tara & Loren</h1>
      <div style={{display: 'flex', gap: 16}}>
        <button style={{border: 'none', background: 'none', }} onClick={() => setTab(Tabs.SCHEDULE)}>Schedule</button>
        <button style={{border: 'none', background: 'none', }} onClick={() => setTab(Tabs.DRESS_CODE)}>Dress Code</button>
        <button style={{border: 'none', background: 'none', }} onClick={() => setTab(Tabs.FAQ)}>FAQ</button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {getContent(tab)}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
