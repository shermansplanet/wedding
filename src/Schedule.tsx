import './App.css'

function Schedule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h2>Wedding Schedule</h2>
      <p>August 24, 2024</p>
      <p>Stable Cafe </p>
      <p>2128 Folsom St, San Francisco, CA 94110</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>4:30pm</p> <p>Doors open</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>4:45pm</p> <p>(Optional) Flower Crown Making</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>5:30pm</p> <p>Ceremony</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>6:00pm</p> <p>Social Hour</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>7:00pm</p> <p>Dinner</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>8:00pm</p> <p>Music, Dancing, Games</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>10:00pm</p> <p>Last Song</p></div>
    </div>)
}

export default Schedule
