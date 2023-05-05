import { useState } from "react"
import classes from './contact-form.module.scss'
import Notification from "./notification"
import { sendContactData } from "../helpers/api-utils"


const ContactForm = () => {

    const [theEmail, setEmail] = useState('')
    const [theName, setName] = useState('')
    const [theMessage, setMessage] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [reqError, setReqError] = useState('')

    const sendMessageHandler = async (e) => {
        e.preventDefault()

        setReqStatus('pending')

        try {
            await sendContactData('/api/contact', {
                email: theEmail,
                name: theName,
                message: theMessage
            })
            setReqStatus('success')
        } catch (error) {
            setReqError(error.message)
            setReqStatus('error')
        }
    }

    let notification

    if (reqStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending...',
            message: 'Message being sent.'
        }
    }

    if (reqStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success',
            message: 'Message sent successfully - thank you!'
        }
    }

    if (reqStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error',
            message: reqError
        }
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
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
        </>
    )
} 
export default ContactForm