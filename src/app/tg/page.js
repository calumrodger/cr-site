import Genny from "./genny"

export const metadata = {
    title: 'stanzafier'
  }

export default async function PoemPage() {

  const source = 
  `so much depends
  upon
  
  a red wheel
  barrow
  
  glazed with rain
  water
  
  beside the white
  chickens`

  return (
        <>
        <Genny source={source}/>
        </>
   
  )
}