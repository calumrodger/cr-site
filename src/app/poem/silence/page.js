import PoemLayout from "@components/poem-layout"
import Silence from "./poem"

export const metadata = {
    title: 'silence'
  }

export default async function PoemPage() {

  return (
<>
        <PoemLayout title="silence" >
        <Silence />
        </PoemLayout>
</>
  )
}