import PoemLayout from "../../../components/poem-layout"
import Silence from "./poem"

export const metadata = {
    title: 'silence'
  }

export default async function PoemPage() {

  return (
    <html lang="en">
      <body>
        <PoemLayout title="silence" >
        <Silence />
        </PoemLayout>
        </body>
    </html>
  )
}