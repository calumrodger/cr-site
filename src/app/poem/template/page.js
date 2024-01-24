import PoemLayout from "../../../components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'poem title here'
  }

export default async function PoemPage() {

  return (
    <html lang="en">
        <body>
            <PoemLayout title="poem title here" borderWidthInRem="" borderColour="" textColour="">
                <Poem />
            </PoemLayout>
        </body>
    </html>
  )
}