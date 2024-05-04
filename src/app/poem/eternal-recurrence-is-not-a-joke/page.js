import PoemLayout from "@components/poem-layout"
import Poem from "./poem"

export const metadata = {
    title: 'eternal recurrence is NOT a joke'
  }

export default async function PoemPage() {

  return (
            <>
            <PoemLayout title="eternal recurrence is NOT a joke" borderColour="#000080" textColour="">
                <Poem />
            </PoemLayout>
            </>
  )
}