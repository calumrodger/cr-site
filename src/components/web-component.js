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
        <h3>Apps</h3>
        <ul className={classes.poemsList}>
        <li><a href='https://makepoem.press'>makepoem.press</a> (live app and publishing platform)</li>
        <p>My current major project. A &apos;digital poetry workstation&apos; and publishing platform responding to the question &apos;what happens when you fuse two forms of media - the <em>poem</em> and the <em>webpage</em>?&apos; Development began in spring 2026 and is ongoing. Disclaimer: Claude Code used extensively in development.</p>
        <li><Link href='/stanzafier'>Stanzafier</Link> (abandoned app but still largely functional)</li>
        <p>A poetry generator and editor. API features (LLM and third-party text sources) are broken because I&apos;ve not kept the API keys up-to-date, but core functionality still works. The generator is also available via <a href='https://makepoem.press'>makepoem.press</a> as <em>StanzafierLite</em>. Developed largely in the first half of 2024. Disclaimer: handcoded.</p>
        </ul>
        <h3>Original Poems</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/kafkaesque-senryu'>kafkaesque senryu</Link> (static)</li>
        <p/>
        <li><Link href='/poem/overlook-typewriter'>Overlook Typewriter</Link> (interactive)</li>
        <p/>
        <li><Link href='/poem/eternal-recurrence-is-not-a-joke'>eternal recurrence is NOT a joke</Link> (animated (gif))</li>
        <p/>
        <li><Link href='/poem/spring-poem'>spring poem</Link> (static)</li>

        <p/>
        <li><Link href='/poem/summer-poem'>summer poem</Link> (animated)</li>
        <p>After Aram Saroyan</p>
        </ul>
        <h3>Cover Versions</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/opalka-simulator'>Opalka Simulator: 2024 / 1 → ∞</Link> (animated)</li>
        <p>Automated simulation of Roman Opalka&apos;s painting series &apos;1965 / 1 → ∞&apos; (1965-2011/∞)</p>
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
