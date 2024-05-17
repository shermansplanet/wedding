import { useState } from 'react'
import { GuestData } from './App';
import { ref, set, getDatabase } from 'firebase/database';

interface RsvpProps {
    guestData: GuestData,
    passcode: string
}

const Rsvp = ({ guestData, passcode }: RsvpProps) => {
    const [attending, setAttending] = useState<boolean>(guestData.attending ?? false);
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>RSVP for {guestData.name}</h2>
        <div className='checkboxRow'><button
            className={attending ? "checkmarkButton checked" : "checkmarkButton"}
            onClick={() => setAttending(!attending)}>
        </button>I can attend the wedding.</div>
        <div style={{ height: "24px" }} />
        <button onClick={() => {
            set(ref(getDatabase(), 'passcodes/' + passcode), {
                ...guestData,
                attending: attending
            });

        }}>Save</button>
    </div >
}

export default Rsvp
