import PoemLayout from "../../../components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'the waves the waves thank god the waves'
  }

export default async function PoemPage() {

  return (
    <html lang="en">
        <body>
            <PoemLayout title="the waves the waves thank god the waves" borderWidthInRem="" borderColour="" textColour="">
                <Poem />
            </PoemLayout>
        </body>
    </html>
  )
}