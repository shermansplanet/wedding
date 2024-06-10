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
            rsvps[i] = { attending: undefined, dietaryRestrictions: "" };
        }
        let rsvp = rsvps[i];
        rsvpElements.push(<div style={{ marginBottom: "24px" }} key={"rsvp_" + i}>
            <h2>RSVP for {guestData.names[i]}</h2>
            <div className='checkboxRow'>
                <button
                    className={rsvp.attending == true ? "checkmarkButton checked" : "checkmarkButton"}
                    onClick={() => {
                        rsvp.attending = true;
                        rsvps[ci] = rsvp;
                        setRsvps({ ...rsvps });
                    }}>I can attend
                </button>
                <button
                    className={rsvp.attending == false ? "checkmarkButton checked" : "checkmarkButton"}
                    onClick={() => {
                        rsvp.attending = false;
                        rsvps[ci] = rsvp;
                        setRsvps({ ...rsvps });
                    }}>I cannot attend
                </button>
            </div>
            <input style={{ marginTop: "4px", padding: "4px 0px", fontSize: "16pt" }}
                placeholder='Dietary Restrictions'
                value={rsvp.dietaryRestrictions}
                onChange={e => {
                    rsvp.dietaryRestrictions = e.target.value;
                    rsvps[ci] = rsvp;
                    setRsvps({ ...rsvps });
                }}
            ></input>
        </div>)
    }

    try {
        console.log("setting");
        set(ref(getDatabase(), 'passcodes/' + passcode + "/rsvp"), rsvps);
        if (timeout != undefined) {
            clearTimeout(timeout);
        }
    } catch (ignored) {

    }

    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>Please RSVP by July 13.</p>
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
