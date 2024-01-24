import PoemLayout from "../../../components/poem-layout"
import SpringPoem from "./spring-poem"

export const metadata = {
    title: 'spring poem'
  }

export default async function PoemPage() {

  return (
    <html lang="en">
      <body>
        <PoemLayout title="spring poem" >
        <SpringPoem />
        </PoemLayout>
        </body>
    </html>
  )
}