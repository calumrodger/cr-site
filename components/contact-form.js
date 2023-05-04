import { useState } from "react"
import classes from './contact-form.module.scss'

const ContactForm = () => {
    const [theEmail, setEmail] = useState('')
    const [theName, setName] = useState('')
    const [theMessage, setMessage] = useState('')

    const sendMessageHandler = (e) => {
        e.preventDefault()

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                email: theEmail,
                name: theName,
                message: theMessage
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <>
        <form className={classes.formContainer}>
            <label htmlFor="name">name</label>
            <input type="text" id="name" required value={theName} onChange={e => setName(e.target.value)}/>
            <label htmlFor="email">email - optional</label>
            <input type="email" id="email" value={theEmail} onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="message">message</label>
            <textarea id="message" rows="5" required value={theMessage} onChange={e => setMessage(e.target.value)}/>
            <button onClick={sendMessageHandler}>send</button>
        </form>
        </>
    )
}

export default ContactForm