export const sendContactData = async (path, details) => {

  const response = await fetch(path, {
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
