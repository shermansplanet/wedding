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
    const [timeout, setTimeoutState] = useState<NodeJS.Timeout>();

    let rsvpElements = new Array<JSX.Element>();
    for (let i = 0; i < guestCount; i++) {
        const ci = i;
        if (rsvps[i] == undefined) {
            rsvps[i] = { attending: false, dietaryRestrictions: "" };
        }
        let rsvp = rsvps[i];
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
            <input style={{ marginTop: "4px", padding: "4px 0px", fontSize: "16pt" }}
                placeholder='Dietary Restrictions'
                content={rsvp.dietaryRestrictions}
                onChange={e => {
                    rsvp.dietaryRestrictions = e.target.value;
                    rsvps[ci] = rsvp;
                    setRsvps({ ...rsvps });
                }}
            ></input>
        </div>)
    }

    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {rsvpElements}
        <button onClick={() => {
            set(ref(getDatabase(), 'passcodes/' + passcode + "/rsvp"), rsvps);
            if (timeout != undefined) {
                clearTimeout(timeout);
            }
            setTimeoutState(setTimeout(() => { setTimeoutState(undefined) }, 5000));
        }}>Save</button>
        <div className={timeout == undefined ? "savedIndicator hidden" : "savedIndicator"}>
            RSVP Saved!
        </div>
    </div >
}

export default Rsvp
