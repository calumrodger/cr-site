import { MongoClient } from "mongodb"

const handler = async (req, res) => {

    const MONGODB_URI = process.env.MONGODB_URI

    if (req.method === 'POST') {
        const {email, name, message} = req.body

        if (!name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({message: 'Invalid input.'})
            return
        }

        const newMessage = {
            email,
            name,
            message
        }

        let client 

        try {
            client = await MongoClient.connect(MONGODB_URI)
        } catch (error) {
            res.status(500).json({message: 'error!'})
            return
        }

        const db = client.db()

        try {
        const result = await db.collection('messages').insertOne(newMessage)
        newMessage.id = result.insertedId
        } catch (error) {
            client.close()
            res.status(500).json({message: 'Storing message failed'})
            return
        }
        
        client.close()

        res.status(201).json({message: 'success', message: newMessage})
    }
}

export default handler