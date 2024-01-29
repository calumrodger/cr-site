import PoemLayout from "../../../components/poem-layout"
import SpringPoem from "./spring-poem"

export const metadata = {
    title: 'spring poem'
  }

export default async function PoemPage() {

  return (
<>
        <PoemLayout title="spring poem" >
        <SpringPoem />
        </PoemLayout>
</>
  )
}