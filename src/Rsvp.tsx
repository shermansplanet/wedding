import { useState } from 'react'
import { GuestData, RsvpData } from './App';
import { ref, set, getDatabase } from 'firebase/database';

interface RsvpProps {
    guestData: GuestData,
    passcode: string
}

const Rsvp = ({ guestData, passcode }: RsvpProps) => {

    let guestCount = guestData.names.length;
    const [rsvps, setRsvps] = useState<RsvpData[]>(guestData.rsvp ?? new Array<RsvpData>(guestCount));

    let rsvpElements = new Array<JSX.Element>();
    for (let i = 0; i < guestCount; i++) {
        const ci = i;
        let rsvp = rsvps[i] ?? { attending: false };
        rsvpElements.push(<div style={{ marginBottom: "24px" }} key={"rsvp_" + i}>
            <h2>RSVP for {guestData.names[i]}</h2>
            <div className='checkboxRow'><button
                className={rsvp.attending ? "checkmarkButton checked" : "checkmarkButton"}
                onClick={() => {
                    rsvp.attending = !rsvp.attending;
                    rsvps[ci] = rsvp;
                    setRsvps({ ...rsvps });
                }}>
            </button>I can attend the wedding.</div>
        </div>)
    }

    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {rsvpElements}
        <button onClick={() => {
            set(ref(getDatabase(), 'passcodes/' + passcode + "/rsvp"), rsvps);

        }}>Save</button>
    </div >
}

export default Rsvp
