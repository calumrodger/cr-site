import Genny from "./genny"

export const metadata = {
    title: 'stanzafier'
  }

export default async function PoemPage() {

  const source = 
  `so much depends
  upon`

  return (
        <>
        <Genny source={source}/>
        </>
   
  )
}