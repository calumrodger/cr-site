import Genny from "./genny"
import classes from './page.module.scss';

export const metadata = {
    title: 'stanzafier'
  }

export default async function PoemPage() {

  const source = "so much depends \n upon \n";

  return (
          <Genny source={source}/>
  )
}