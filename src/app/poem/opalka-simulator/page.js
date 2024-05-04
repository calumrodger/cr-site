import PoemLayout from "@components/poem-layout"
import Poem from "./poem"

const title = "Opalka Simulator: 2024 / 1 → ∞"

export const metadata = {
    title: title
  }

export default async function PoemPage() {

  return (
            <>
            <PoemLayout title={title} borderColour="" textColour="">
                <Poem />
            </PoemLayout>
            </>
  )
}