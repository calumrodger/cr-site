import PoemLayout from "../../../components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'the waves the waves thank god the waves'
  }

export default async function PoemPage() {

  return (
            <>
            <PoemLayout title="the waves the waves thank god the waves" borderColour="#000080" textColour="">
                <Poem />
            </PoemLayout>
            </>
  )
}