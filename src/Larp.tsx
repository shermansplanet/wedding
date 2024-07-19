import './App.css'

function Larp() {
    return (
        <div style={{ width: "350px" }}>
            <p>
                We're running a LARP the day before the wedding!
                It will be from 5pm to 8pm on the 23rd at Langton Labs (9 Langton Street, San Francisco).
            </p>
            <p>
                This game is about a haunted circus visiting the strange town of Well's Spring.
                It will be rules-light and primarily focused on character interaction.
            </p>
            <p style={{ border: "2px dashed var(--gold)", padding: "8px", margin: "0px -8px" }}>
                If you're interested in participating, please sign up{' '}
                <a target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSf9tuGPJg6KHibIwWBh5qiCl9vZ3lgiDtMUJqyj0Aea2uBbMw/viewform?usp=sf_link'>
                    here
                </a>
                {' '}by <b>June 19th.</b>
            </p>
        </div>)
}

export default Larp
