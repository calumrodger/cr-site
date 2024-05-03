import PoemLayout from "@components/poem-layout"
import Poem from "./poem"

const poemTitle = "poem title here"

const key = "AIzaSyAZQfEvZgmkyvB-pvlpqHhlCBEHSYhXyWM";
const videoId = "q86g1aop6a8";

async function getData() {
  const res = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?maxResults=5000&part=snippet&part=replies&videoId=' + videoId + '&key=' + key)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export const metadata = {
    title: poemTitle
  }

export default async function PoemPage() {

  const theData = await getData();
  // const aProp = theData.items[0].snippet
  const aProp = theData.items;

  return (
            <>
            <PoemLayout title={poemTitle} borderColour="" textColour="">
                <Poem text={aProp}/>
            </PoemLayout>
            </>
  )
}