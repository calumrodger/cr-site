import Genny from "./genny"
import classes from './page.module.scss';

export const metadata = {
    title: 'stanzafier'
  }

export default async function PoemPage() {

  // const source = "This is the STANZA PAD. \n Click on a word to SELECT it. \n Transform SELECTED words with the WORD BANK and FX panels. \n When your stanza is ready, click SAVE STANZA. \n To create a new stanza, click GENERATE. \n Click POEM PAD to view and rearrange stanzas. \n Click OUTPUT to admire your poem. \n Click HELP/DOCS to learn more.";

  const source = "This, the STANZA PAD: \n click a word to SELECT it; \n play with the buttons.";
  return (
          <Genny source={source}/>
  )
}