import PoemLayout from "../../../components/poem-layout"
import FoliageComponent from "./summer-poem"

export const metadata = {
    title: 'summer poem'
  }

export default async function PoemPage() {

  return (
        <>
        <PoemLayout title="summer poem" >
        <FoliageComponent/>
        </PoemLayout>
        </>
  )
}