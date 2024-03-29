import PoemLayout from "@components/poem-layout"
import Poem from "./poem"

const poemTitle = "kafkaesque senryu"

export const metadata = {
    title: poemTitle
  }

export default async function PoemPage() {

  return (
            <>
            <PoemLayout title={poemTitle} borderColour="" textColour="">
                <Poem />
            </PoemLayout>
            </>
  )
}