import Poem from "./poem"

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
        <Poem source={source}/>
        </>
   
  )
}