import PoemLayout from "../../../components/poem-layout"
import Lighght from "./the-lighght-going-on-and-off"

export const metadata = {
    title: "the 'lighght' going on and off"
  }

export default async function PoemPage() {

  return (
<>
        <PoemLayout title="the 'lighght' going on and off" >
        <Lighght/>
        </PoemLayout>
</>
  )
}