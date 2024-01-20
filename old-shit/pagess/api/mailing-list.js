import { MongoClient } from "mongodb"

const handler = async (req, res) => {

    const MONGODB_URI = process.env.MONGODB_URI

    if (req.method === 'POST') {
        const {email} = req.body

        if ( !email || !email.includes('@') ) {
            res.status(422).json({message: 'invalid input'})
            return
        }

        const newEmail = {email}

        let client 

        try {
            client = await MongoClient.connect(MONGODB_URI)
        } catch (error) {
            res.status(500).json({message: 'error!'})
            return
        }

        const db = client.db()

        try {
        const result = await db.collection('mailing-list').insertOne(newEmail)
        newEmail.id = result.insertedId
        } catch (error) {
            client.close()
            res.status(500).json({message: 'Storing message failed'})
            return
        }
        
        client.close()

        res.status(201).json({message: 'success', message: newEmail})
    }
}

export default handler