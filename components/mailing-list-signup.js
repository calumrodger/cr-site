import { useState } from "react"
import Notification from "./notification"
// import { sendContactData } from "../helpers/api-utils"

export const sendContactData = async (details) => {

    const response = await fetch('api/mailing-list', {
         method: 'POST',
         body: JSON.stringify(details),
         headers: {
             'Content-Type': 'application/json'
         }
     })
  
     const data = await response.json()
  
     if (!response.ok) {
         throw new Error(data.message || "That didn't work.")
     }
}

  
const MailingListSignup = () => {

    const [theEmail, setEmail] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [reqError, setReqError] = useState('')

    const sendMessageHandler = async (e) => {
        e.preventDefault()

        setReqStatus('pending')

        try {
            await sendContactData({
                email: theEmail
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
            message: 'Please wait.'
        }
    }

    if (reqStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success',
            message: 'Sign up successful - thank you!'
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
        <form>
            <label htmlFor="email">email</label>
            <input type="email" id="email" required value={theEmail} onChange={e => setEmail(e.target.value)}/>
            <button onClick={sendMessageHandler}>sign up</button>
        </form>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
        </>
    )
}
export default MailingListSignup
