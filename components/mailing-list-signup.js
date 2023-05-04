import { useState } from "react"

const MailingListSignup = () => {
    const [theEmail, setEmail] = useState('')

    const sendMessageHandler = (e) => {
        e.preventDefault()

        fetch('/api/mailing-list', {
            method: 'POST',
            body: JSON.stringify({
                email: theEmail,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <>
        <form>
            <label htmlFor="email">email</label>
            <input type="email" id="email" value={theEmail} onChange={e => setEmail(e.target.value)}/>
            <button onClick={sendMessageHandler}>sign up</button>
        </form>
        </>
    )
}

export default MailingListSignup