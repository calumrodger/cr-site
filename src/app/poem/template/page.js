import PoemLayout from "../../../components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'poem title here'
  }

export default async function PoemPage() {

  return (
<>
            <PoemLayout title="poem title here" borderColour="" textColour="">
                <Poem />
            </PoemLayout>
            </>
  )
}