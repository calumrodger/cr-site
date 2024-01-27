import PoemLayout from "../../../components/poem-layout"
import FoliageComponent from "./summer-poem"

export const metadata = {
    title: 'summer poem'
  }

export default async function PoemPage() {

  return (
    <html lang="en">
      <body>
        <PoemLayout title="summer poem" >
        <FoliageComponent/>
        </PoemLayout>
        </body>
    </html>
  )
}