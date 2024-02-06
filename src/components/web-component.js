'use client';

import classes from './web-component.module.scss'
import Link from 'next/link'

const WebCategory = (props) => {

    const introPost = props.introPost

    const lighghtTitle = `the 'lighght' going on and off`

    return (
        <>
          <div className={classes.pageContent}>
        <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
        <div className={classes.poemsListContainer}>
        <h3>Original Poems</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/spring-poem'>spring poem</Link> (static)</li>
        <p/>
        <li><Link href='/poem/summer-poem'>summer poem</Link> (animated)</li>
        <p>After Aram Saroyan</p>
        </ul>
        <h3>Cover Versions</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/silence'>silence</Link> (interactive)</li>
        <p>Interactive remake of one of the earliest concrete poems, Eugen Gomringer&apos;s &apos;silence&apos; (1954). To play: touch the silence.</p>
        <li><Link href='/poem/the-lighght-going-on-and-off'>{lighghtTitle}</Link> (animated)</li>
        <p>Animated homage to Aram Saroyan&apos;s iconic minimalist poem &apos;lighght&apos; (1966), by way of Martin Creed&apos;s Turner Prize-winning artwork &apos;Work No. 227: The Lights Going On and Off&apos; (2001). </p>
        </ul>
        </div>
      </div>
        </>
    )
}

export default WebCategory
