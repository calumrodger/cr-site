import Genny from "./genny"

export const metadata = {
    title: 'stanzafier'
  }

export default async function PoemPage() {

  const source = "so much depends \n upon \n";

  return (
        <>
        <Genny source={source}/>
        </>
   
  )
}