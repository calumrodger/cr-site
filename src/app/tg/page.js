import PoemLayout from "@components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'poem title here'
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
    <html lang="en">
        <body>
            <PoemLayout title="poem title here" borderWidthInRem="" borderColour="" textColour="">
                <Poem source={source}/>
            </PoemLayout>
        </body>
    </html>
  )
}