import classes from './docs.module.scss';
import stanzaPadImg from '../../../public/tg/docs-images/homescreen-coloured.png'
import poemPadImg from '../../../public/tg/docs-images/poem-pad.png'
import sourcePadImg from '../../../public/tg/docs-images/source-pad.png'
import outputImg from '../../../public/tg/docs-images/sample-output.png'
import fxApi from '../../../public/tg/docs-images/fx-api.png'
import fxNplus from '../../../public/tg/docs-images/fx-nplusx.png'
import fxLlm from '../../../public/tg/docs-images/fx-llm.png'
import fxTypo from '../../../public/tg/docs-images/fx-typography.png'
import generateControls from '../../../public/tg/docs-images/generate-controls.png'
import globalControls from '../../../public/tg/docs-images/globals-section.png'
import outputAs from '../../../public/tg/docs-images/output-as.png'
import outputTitle from '../../../public/tg/docs-images/output-title.png'
import padSwitcher from '../../../public/tg/docs-images/pad-switcher.png'
import poemPadButtons from '../../../public/tg/docs-images/poem-pad-buttons.png'
import saveStanza from '../../../public/tg/docs-images/save-stanza-button.png'
import srcPad from '../../../public/tg/docs-images/src-pad.png'
import stanzaPadButtons from '../../../public/tg/docs-images/stanza-pad-buttons.png'
import stanzaUndo from '../../../public/tg/docs-images/stanza-undo.png'
import wordBankButtons from '../../../public/tg/docs-images/word-bank-buttons.png'
import wordBankPopulate from '../../../public/tg/docs-images/word-bank-populate.png'
import wordBankInject from '../../../public/tg/docs-images/word-bank-inject.png'
import qs1 from '../../../public/tg/docs-images/qs1.png'
import qs2 from '../../../public/tg/docs-images/qs2.png'
import qs3 from '../../../public/tg/docs-images/qs3.png'
import qs4 from '../../../public/tg/docs-images/qs4.png'
import qs5 from '../../../public/tg/docs-images/qs5.png'
import qs6 from '../../../public/tg/docs-images/qs6.png'
import qs7 from '../../../public/tg/docs-images/qs7.png'
import Image from 'next/image';
import Link from 'next/link';

import Title from '@tg/global/title';

const Docs = (props) => {

    const { onSetDocsMode } = props;

    return (
        <>
        <div className={classes.container}>
            <h1 style={{fontStyle: "italic", marginBottom: ".2rem"}}>Stanzafier0.9</h1>
            <p style={{fontSize: ".8rem"}}>poem creation and remix tool</p>
            <div style={{padding: "1rem", background: "#db3a34"}}>
            <h3>WARNINGS - READ THIS FIRST!</h3>
            <ul>
                <li>Stanzafier is entirely contained in this webpage. <b>If you navigate away from the page (e.g. clicking ‘back’ or ‘refresh’ on your browser) you will lose all your work.</b> (This also applies to the page you are currently reading – use the ‘back’ button on the panel below to return to the main Stanzafier screen.)</li>
                <li>Stanzafier is a work-in-progress and prone to bugs and occasional crashes.</li>
                <li>In particular, combinations of long/complex forms, very large source texts and n-level settings 2-9 can create long wait times and freezes between stanzas. In the program’s alpha state no limits have been placed on input/output sizes, so if you encounter these issues please try a smaller source text and/or more simple poetic form. Please be aware also that the syllable- and stress-counting logic is far from perfect (especially the latter). The Stanzafier devs will work against the limits of language to improve this logic in future versions.</li>
                <li>As such, ensure you save regularly to ensure you do not lose valuable work if/when you accidentally navigate away from the page and/or it crashes! There are three ways to save:</li>
                    <ul>
                        <li><b>SAVE STATE</b>: saves your poem and all your settings for re-loading in Stanzafier via the LOAD STATE button. Find both in the centre-top-right of the home screen.</li>
                        <li><b>SAVE TO TXT</b>: save your poem as a txt file. Note typographical styles are lost in this process. Find the button on the lower-left of the POEM PAD screen.</li>
                        <li><b>export to png</b>: save your finished, styled poem as an image file. Accessible via the OUTPUT screens for LINES, GRID and PAGES (export to gif for LOOP output coming soon).</li> 
                    </ul>
                <li>CONTENT WARNING/DISCLAIMER: One of Stanzafier’s key features is the ability to create randomly-generated stanzas from various source texts. Although care has been taken to remove the most egregiously offensive language from dictionaries and built-in presets, some traces may remain – and given the infinite syntactical possibilities of language generation, the possibility of offensive results can never be wholly avoided. <b>When you use the ‘GENERATE’ and ‘FX’ tools, you do so at your own risk!</b></li>
            </ul>
            </div>
            <div>
                <h2 id="#contents">CONTENTS</h2>
                <ul>
                    <li><Link href="#introduction">INTRODUCTION</Link></li>
                    <li><Link href="#quick-start">QUICK START GUIDE</Link></li>
                    <li><Link href="#theoretical-lore">THEORETICAL LORE</Link></li>
                    <li><Link href="#documentation">DOCUMENTATION</Link></li>
                    <li><Link href="#bugs">KNOWN BUGS</Link></li>
                    <li><Link href="#features">FUTURE FEATURES</Link></li>
                    <li><Link href="#credits">CREDITS</Link></li>
                    <li><Link href="#further-reading">FURTHER READING</Link></li>
                </ul>
            </div>
            <h2 id="introduction">INTRODUCTION</h2>
           <p>Stanzafier is a revolutionary new web app designed as a one-stop-solution for all your experimental poetry creation and remix needs. With a workflow inspired by the tools of electronic music production (think magnetic poetry meets Roland drum machine), Stanzafier offers the poet-user an unparalleled suite of text manipulation tools: granular typographical manipulation at both stanza- and word-level, customisable word bank, and generative techniques ranging from the literary-historical (Dada poem and Oulipo n+) to state-of-the-art data processing (LLMs and APIs), and not one but <em>four</em> render/export formats (lines, grid, pages, loop). Never before has so much avant-garde poetic potential been unlocked by a small virtual box!</p>
            <h2 id="quick-start">QUICK START GUIDE</h2>
            <p>The basic workflow of Stanzafier is as follows:</p>
            <ul>
                <li>Click GENERATE to create a new stanza.</li>
                <li>Edit your stanza on the STANZA PAD by SELECTING words via clicking on them, then using the buttons, WORD BANK and FX panels to make changes.</li>
                <li>When you’re happy with it, click SAVE STANZA.</li>
                <li>Repeat until you have a few stanzas.</li>
                <li>Then click POEM PAD to see all your stanzas.</li>
                <li>Optionally, edit your poem using the POEM PAD buttons and TYPOGRAPHY FX.</li>
                <li>OUTPUT your poem as either LINES, GRID, PAGES or LOOP.</li>
                <li>Tweak colours and style as desired.</li>
                <li>EXPORT your poem as a png (lines, grid, pages) or gif (loop: coming soon).</li>
            </ul>
            <p>So that’s:</p> 
            <b>
            <p>1. click GENERATE → </p>
            <Image src={qs1.src} height={qs1.height / 2} width={qs1.width /2}/>
            <p>2. play on STANZA PAD → </p>
            <Image src={qs2.src} height={qs2.height / 2} width={qs2.width /2}/>
            <p>3. click SAVE STANZA → </p>
            <Image src={qs3.src} height={qs3.height / 2} width={qs3.width /2}/>
            <p>4. repeat steps 1-3 a few times → </p>
            <p>5. click POEM PAD → </p>
            <Image src={qs4.src} height={qs4.height / 2} width={qs4.width /2}/>
            <p>6. play on POEM PAD → </p>
            <Image src={qs5.src} height={qs5.height / 2} width={qs5.width /2}/>
            <p>7. select output style then click OUTPUT → </p>
            <Image src={qs6.src} height={qs6.height / 2} width={qs6.width /2}/>
            <p>8. tweak colours and style as desired, then click EXPORT → </p>
            <Image src={qs7.src} height={qs7.height / 2} width={qs7.width /2}/>
            <p>8. you have created a poem! now rinse and repeat</p></b>
            <p>This section will be expanded with fun graphics etc. soon; in the meantime check the Docs or the tutorial video (coming soon) for more comprehensive instructions - or just start playing and figure it out!</p>
            <h2 id="theoretical-lore">THEORETICAL LORE</h2>
            <p>Stanzafier is built according to ‘The Five Columns of the Well-Poetic Framework’™. These are as follows:</p>
            <ol>
                <li>words are things</li>
                <li>space is poetic</li>
                <li>meaning is playable</li>
                <li>error is fun</li>
                <li>art is repetition (& adjustment)</li>
            </ol>
            <p>This section will be expounded upon in the near future.</p>
            <h2 id="documentation">DOCUMENTATION</h2>
            <p>Welcome to Stanzafier. The Stanzafier interface is arranged in various sections. Refer to the diagram below and follow the links to find detailed documentation on each section. </p>
            <p>The default screen is the home screen or STANZA PAD SCREEN.</p>
            <Image src={stanzaPadImg.src} height={stanzaPadImg.height / 2} width={stanzaPadImg.width /2}/>
            <p>Click the link to go directly to the section docs:</p>
            <ul>
                <li><Link href="#generate">GENERATE SECTION</Link> – inside the green border (on the centre-top-right)</li>
                <li><Link href="#stanza-pad">STANZA PAD</Link> – inside the red border (in the centre)</li>
                <li><Link href="#word-bank">WORD BANK</Link> – inside the blue border (the left panel)</li>
                <li><Link href="#fx">FX SECTION</Link> – inside the purple border (the right panel)</li>
                <li><Link href="#poem-pad">POEM PAD</Link> – access by clicking the POEM PAD button on the centre-bottom-right</li>
                <li><Link href="#output">OUTPUT SECTION</Link> – inside the orange border (at the bottom)</li>
                <li><Link href="#source-pad">SOURCE PAD</Link> – access by clicking the SOURCE PAD button in the top-centre</li>
                <li><Link href="#global">GLOBAL SECTION</Link> – inside the yellow border (on the centre-top-left)</li>
            </ul>
            <h3 id="generate">GENERATE SECTION</h3>
            <Image src={generateControls.src} height={generateControls.height / 2} width={generateControls.width /2}/>
            <p>This section controls the settings by which new stanzas are generated. Adjust settings as desired then click GENERATE to create a new stanza in the STANZA PAD.</p>
            <ul>
                <li><b>preset</b>: select the input text from which stanzas are generated. Select a preset from the dropdown menu (new presets can be added via the SOURCE PAD). Stanzafier comes with a few built-in presets, namely:</li>
                <ul>
                    <li>burnz: the complete poetical works of Robert Burns</li>
                    <li>emily: the complete poetical works of Emily Dickinson</li>
                    <li>button tenders: ‘Tender Buttons’ by Gertrude Stein</li>
                    <li>sonnets: Shakespeare’s Sonnets</li>
                    <li>tintern wasted: ‘Lines Composed at Tintern Abbey’ by William Wordsworth and ‘The Waste Land’ by T.S. Eliot</li>
                </ul>
                <li><b>form</b>: set a poetic form to generate stanzas in. Enter the desired form in the box. Numbers determine the length of each line (determined in measures – syllables or stresses); forward-slashes indicate a line-break. For example, a haiku is represented by ‘5/7/5’ (when ‘measure’ is set to ‘syllable’); a ballad stanza ‘4/3/4/3’ (when ‘measure’ is set to ‘stress’). Note that multiple forward-slashes can be used to create spaces between lines. Only numerals and forward-slashes may be entered in this box; all other key presses are disabled.</li>
                <li><b>n-level</b>: this determines the degree of randomness in the stanza. The lower the n-level, the higher the randomness.</li>
                    <ul>
                        <li>n-level 1 is pure random: each new word is selected with no reference to the previous word(s), in the manner of Tzara’s Dadaist poem.</li>
                        <li>n-levels 2-9 use the n-gram method, probabilistically determining the next word in a sequence based on the previous word(s). A higher n-level will preserve larger chunks of the original sequence, hence ‘less random’.</li>
                        <li>n-level OFF simply grabs an original sequence from the source text which meets the form, in the manner of the classic ‘found poem’.</li>
                    </ul>
                <li><b>measure</b>: select a measure for your generated stanza, either syllables or stresses.</li>
                <li><b>reseed by</b>: if ‘stanza’ is selected, Stanzafier will attempt to find an unbroken sequence from the source text which can be arranged in the desired form. If ‘line’ is selected, Stanzafier will ‘start afresh’ (reseed) with each new line (another way of expressing this is ‘line’ denotes ‘randomise by line’, and ‘stanza’ denotes ‘do not randomise’). Note that if n-level is set to 1 this setting has no effect, as n-level 1 effectively means ‘randomise by word’.</li>
                <li><b>keep</b>: if ‘case’ is selected, output will appear in upper and lower case as per the original; if unselected, all output will be lowercase. If ‘punct’ is selected, original punctuation is retained; if unselected, output should contain no punctuation.</li>
                <li><b>GENERATE</b>: generates a new stanza to the STANZA PAD according to the settings established above.</li>
            </ul>
            <h3 id="stanza-pad">STANZA PAD</h3>
            <p>The STANZA PAD is where much of the fine-grained editing work takes place. Words can be SELECTED or UNSELECTED by clicking on them; a SELECTED word is contained by a black border, as in the example word ‘SELECT’ in the image above.</p>
            <Image src={saveStanza.src} height={saveStanza.height / 2} width={saveStanza.width /2}/>
            <ul>
                <li><b>SAVE STANZA</b>: adds the stanza to your poem. When you click this button you should see the ‘# OF STANZAS’ box in the GLOBAL SECTION increase by 1.</li>
            </ul>
            <Image src={stanzaUndo.src} height={stanzaUndo.height / 2} width={stanzaUndo.width /2}/>
            <ul>
                <li><b>undo/redo</b>: revert the stanza pad to its previous state (note: only applies to word/positioning changes; typographical changes can be undone with the RESET button on the FX panel)</li>
            </ul>
            <Image src={stanzaPadButtons.src} height={stanzaPadButtons.height / 2} width={stanzaPadButtons.width /2}/>
            <p>In addition, the following buttons offer control of the stanza. Buttons are disabled and enabled based on the number of words selected (for example, ‘select all’ is disabled when all words are already selected).</p>
            <ul>
                <li><b>SAVE TO BANK</b>: adds all selected words to the Word Bank. Great if you want to store a line or phrase for use in a future stanza.</li>
                <li><b>EDIT WORD</b>: opens ‘edit word mode’ so a word can be manually tweaked. Note that only one word can be edited at a time. Also, if you add a space in the edit word field, the word will automatically be broken into two words when you exit edit word mode.</li>
                <li><b>DELETE</b>: delete all selected words</li>
                <li><b>select all</b>: select all words in the stanza.</li>
                <li><b>unselect all</b>: unselect all selected words in the stanza.</li>
                <li><b>◀ move ▶</b>: move all selected words left or right</li>
                <li><b>dupe</b>: creates a copy of each selected word, adding this copy directly after the selected word</li>
                <li><b>shuffle</b>: randomly rearrange all selected words</li>
                <li><b>strip caps</b>: removes all capital letters from all selected words (note that this does NOT apply to caps added using the ‘CAPS’ button on the Typography FX panel. To remove caps added in this fashion, click the ‘CAPS’ or ‘RESET’ button on the FX panel.</li>
                <li><b>strip punc</b>: removes punctuation from all selected words</li>
                <li><b>◀ punc ▶</b>: adds various punctuation to all selected words. Use the arrows to cycle through the options.</li>
                <li><b>line break</b>: adds a new line break immediately after all selected words.</li>
                <li><b>/merge</b>: removes any line breaks immediately after all selected words.</li>
                
            </ul>
            <h3 id="word-bank">WORD BANK</h3>
            <p>This section allows you to collect and store words for manually adding to the STANZA PAD. It also makes for a useful clipboard to store words/lines/phrases from the Stanza Pad you would like to keep (via the SAVE TO BANK button on the Stanza Pad). The main WORD BANK area behaves much as the STANZA PAD, where words can be selected and unselected by clicking on them. POPULATE adds new words to the WORD BANK. INJECT transforms your current stanza.</p>
            <h4>WORD BANK BUTTONS</h4>
            <Image src={wordBankButtons.src} height={wordBankButtons.height / 2} width={wordBankButtons.width /2}/>
            <ul>
            <li><b>SAVE AS LIST</b>: saves all selected words as a new word list, which is automatically added to the ‘list’ dropdown below. Upon creation the list will be named ‘new list’; this can be edited via the ‘edit list’ button below</li>
            <li><b>DELETE</b>: remove all selected words</li>
                <li><b>select all</b>: selects all words</li>
                <li><b>unselect all</b>: unselects all selected words</li>
                <li><b>shuffle</b>: randomly rearranges all words. Selected words will automatically be placed at the top of the WORD BANK</li>
                
            </ul>
            <h4>POPULATE SECTION</h4>
            <Image src={wordBankPopulate.src} height={wordBankPopulate.height / 2} width={wordBankPopulate.width /2}/>
            <ul>
                <li><b>#</b>: determine number of new words to add</li>
                <li><b>list / llm</b>: determines how to add words</li>
                    <ul>
                        <li><b>list</b></li>
                            <ul>
                                <li>select a word list from the dropdown</li>
                                <li>words will be added from this list</li>
                            </ul>
                        <li><b>llm</b></li>

                            <ul>
                                <li>write a short prompt in the text field for the kind of words you would like, for example ‘happy adjectives’, ‘clown things’, ‘computers’, ‘sad nouns’</li>
                                <li>an LLM will add new words based on your prompt</li>
                                <li>Note the maximum number of words to add for llm cannot exceed 20; if more than 20 is set in the # field, only 20 will be added.</li>
                            </ul>
                    </ul>
                <li><b>add list</b>: allows you to create a new word list. Use the top input field to give your list a title, and the larger bottom input field to enter your words. Words must be separated by a comma.</li>
                <li><b>edit list</b>: edit the currently selected word list – you can add, remove or change words, or change the title. As per adding a new list, words must be separated by a comma.</li>
            </ul>
            <h4>INJECT SECTION</h4>
            <Image src={wordBankInject.src} height={wordBankInject.height / 2} width={wordBankInject.width /2}/>
            <p>Used to interact between the WORD BANK and STANZA PAD.</p>
            <p>Settings:</p>
            <ul>
                <li><b>replace</b></li>
                    <ul>
                        <li>ONE word from word bank selected: all selected stanza pad words will be replaced by selected word bank word.</li>
                        <li>MULTIPLE words from word bank selected: all selected stanza pad words will be replaced by one of the selected word bank words, chosen at random.</li>
                    </ul>
                <li><b>add after</b></li>
                    <ul>
                        <li>ALL selected word bank words will be inserted AFTER each selected stanza pad word, in the order they appear in the word bank.</li>
                    </ul>
                <li><b>add before</b></li>
                    <ul>
                        <li>ALL selected word bank words will be inserted BEFORE each selected stanza pad word, in the order they appear in the word bank.</li>
                    </ul>
                <li>Click <b>INJECT</b> to replace/add words.</li>
            </ul>
            <h3 id="fx">FX SECTION</h3>
            <p>This section allows you to apply various effects to your stanza. Effects can be applied to selected words in the STANZA PAD. Effects are applied by clicking the relevant button in the FX section.</p>
            <h4>TYPOGRAPHY</h4>
            <Image src={fxTypo.src} height={fxTypo.height / 2} width={fxTypo.width /2}/>
            <ul>
                <li>Use the sliders to adjust the typographical properties – <b>size, weight, font, rotation</b> – of selected words.</li>
                <li>Use the buttons – <b>italic, CAPS, mirror, erase</b> – to switch the relevant typographical properties on and off for selected words.</li>
                <li>Use <b>RESET</b> to revert all selected words back to their original typographical state.</li>
            </ul>
            <h4>N+X</h4>
            <Image src={fxNplus.src} height={fxNplus.height / 2} width={fxNplus.width /2}/>
            <p>This FX panel replaces selected words with new words. Click <b>GO</b> to replace selected words.</p>
            <ul>
                <li><b>keep</b> setting allows you to preserve some of the characteristics of the original word in the replacement word. Up to two ‘keep’ settings may be selected at one time.</li>
                    <ul>
                        <li>If none of the KEEP settings are selected, any random word will be chosen.</li>
                        <li><b>measure</b> keeps the selected measure (syllable or stress).</li>
                        <li><b>rhyme</b> keeps the selected rhyme (if possible).</li>
                        <li><b>class</b> keeps the selected words’ word class.</li>
                    </ul>
                <li><b>src</b> setting allows you to choose the source word list to select words from. The <b>big</b> list contains around 370000 words; the <b>wee</b> list around 10000. Note that this setting has no effect when <b>keep: rhyme</b> is selected, as this function uses its own rhyming dictionary (containing approx. 125000 words). It is only relevant when rhyme is <b>not</b> active as a ‘keep’ setting.</li>
            </ul>
            <h4>API INJECTION</h4>
            <Image src={fxApi.src} height={fxApi.height / 2} width={fxApi.width /2}/>
            <p>This FX panel calls various live online sources to inject words into your stanza. In all cases, words are injected AFTER all selected words. The number of words injected after each selected word can be set using the <b>vol</b> setting.</p>
            <ul>
                <li><b>news</b>: injects headline text from Guardian articles. Use ‘topic’ to enter a keyword to search on.</li>
                <li><b>weather</b>: injects a brief description of the current weather. Use ‘place’ to enter a place name to grab the weather description for. Note that the ‘volume’ setting does not apply to this injection; the entire brief description is injected (usually ten words or so).</li>
                <li><b>film:</b> injects fragments of blurb for various films. Use ‘title’ to add a film title to search for.</li>
                <li>Note that none of the API Injection FX will work unless you enter some text – a topic, place or film title – in the input field prior to clicking <b>GO</b>.</li>
            </ul>
            <h4>LLM</h4>
            <Image src={fxLlm.src} height={fxLlm.height / 2} width={fxLlm.width /2}/>
            <p>This FX panel uses LLM technology to provide various translations of your stanza.</p>
            <ul>
                <li><b>EMOJIFY</b> replaces all selected words with their ‘equivalent’ emojis.</li>
                <li><b>SLANGIFY</b> replaces all selected words with slang ‘equivalents’.</li>
                <li><b>NONSENSIFY</b> replaces all selected words with non-existent ‘nonsense’ words.</li>
                <li><b>global remix</b> allows you to remix your entire stanza by entering a prompt to rewrite by – for example, ‘allen ginsberg’, ‘angry dog’, ‘pirate’. Enter a prompt and click <b>GO</b>. Note that a) clicking <b>GO</b> will delete your entire stanza, so be sure to save your work beforehand, and b) attempting to remix longer stanzas may result in the remix failing.</li>
            </ul>
            <h3 id="poem-pad">POEM PAD</h3>
            <p>The POEM PAD is used to organise, edit and rearrange your stanzas. It also enables additional OUTPUT options – grid, pages and loop.</p>
            <Image src={poemPadImg.src} height={poemPadImg.height / 2} width={poemPadImg.width /2}/>
            <p>Access the POEM PAD by clicking the <b>POEM PAD</b> button on the bottom-centre-right on the main screen. Click the button again to return to the STANZA PAD.</p>
            <Image src={padSwitcher.src} height={padSwitcher.height / 2} width={padSwitcher.width /2}/>
            <p>Click <b>select</b> next to one of the stanzas to select it. A black border shows around selected stanzas, as per words with the stanza pad and word bank.</p>
            <h4>BUTTONS</h4>
            <Image src={poemPadButtons.src} height={poemPadButtons.height / 2} width={poemPadButtons.width /2}/>
            <ul>
                <li><b>SAVE TO TXT</b>: saves the current poem pad contents as a .txt file. Note that all typographical manipulation, and emojis, are lost in this process.</li>
                <li><b>EDIT</b>: only works when ONE stanza is selected. Sends selected stanza to the stanza pad for additional editing. Note in this ‘stanza update mode’, the <b>SAVE STANZA</b> button is replaced with the <b>UPDATE STANZA</b> button, and the <b>POEM PAD</b> button is removed. Make your required changes and click <b>UPDATE STANZA</b> to save your changes and leave ‘stanza update mode’.</li>
                <li><b>DELETE</b>: delete all selected stanzas</li>
                <li><b>select all</b>: select all stanzas</li>
                <li><b>unselect all</b>: unselect all selected stanzas</li>
                <li><b>up/down</b>: move selected stanzas up or down</li>
                <li><b>dupe</b>: duplicate selected stanzas – copied stanzas will be created directly after each selected stanza</li>
                <li><b>shuffle</b>: randomly rearrange all selected stanzas</li>
                <li><b>undo/redo</b>: undo your most recent change, or redo the undo</li>
            </ul>
            <h4>TYPOGRAPHY</h4>
            <p>While other FX panels are exclusive to the stanza pad, typographical manipulation can also take place on the poem pad at stanza level. Use the buttons and sliders to control typography of all selected stanzas.</p>
            <p>Note that there are three levels of typographical styling in Stanzafier: word, stanza and global. Global styling can be adjusted using the <b>base font</b> and <b>size</b> properties in the GLOBAL SECTION, and also by changing the background, poem and title colours in the various OUTPUT screens. There is a hierarchy of styles at work which goes as follows: word styling takes precedence over stanza styling, and stanza styling takes precedence over global styling. This permits a wide range of typographical colours, styles and effects.</p>
            <h3 id="output">OUTPUT SECTION</h3>
            <Image src={outputAs.src} height={outputAs.height / 2} width={outputAs.width /2}/>
            <p>The OUTPUT SECTION outputs your poem in various formats. Click OUTPUT to render your poem in the selected OUTPUT MODE – <b>lines, grid, pages</b> or <b>loop</b>. Note that if you are on the STANZA PAD, <b>lines</b> is the only possible option, and the output screen will only you’re your current working stanza, not your whole poem. Access the Output Section from the POEM PAD to output your entire poem with the full range of output options.</p>
            <p>Experiment with the various output options and paramaters. Here is an example of the output screen set to <b>GRID</b> output.</p>
            <Image src={outputImg.src} height={outputImg.height / 2} width={outputImg.width /2}/>
            <p>A panel on each of the output screens allows you to set a global background colour, poem colour and/or title colour. There is also a small range of options to tweak your output, for example, adjust the number of columns in your grid, or the speed at which your loop plays. Finally, you can click ‘export to png’ to save your poem as an image, or click ‘back’ to return to the previous screen. (Note the ‘export to gif’ button on loop output is not yet operational and is currently disabled.)</p>
            <Image src={outputTitle.src} height={outputTitle.height / 2} width={outputTitle.width /2}/>
            <ul>
                <li><b>title</b>: complete the title field to optionally give your poem a title. The title will render on the output screen. Additionally, it is used to name your file when you click SAVE STATE.</li>
            </ul>
            
            <h3 id="source-pad">SOURCE PAD</h3>
            <Image src={sourcePadImg.src} height={sourcePadImg.height / 2} width={sourcePadImg.width /2}/>
            <p>The SOURCE PAD allows you to customise the input texts for Stanzafier.</p>
            <Image src={srcPad.src} height={srcPad.height / 2} width={srcPad.width /2}/>
            <ul>
                <li>The main viewing window allows you to create and edit new source texts. Enter your text in the larger window and give your source a title in the smaller text field above it.</li>
                <li><b>current preset</b>: select a preset from the dropdown to see and edit the source name and source text in the central windows.</li>
                <li>In addition to manually entering or copypasting text, you can import text via the following methods:</li>

                    <ul>
                        <li><b>get from YouTube</b>: this will open a new text input field just above ‘source name’. Copypaste a YouTube video url into the field then click <b>GO</b> to populate the source pad with the 100 most recent comments from your chosen video.</li>
                        <li><b>import from txt</b>: populate the source pad with any txt file loaded from your computer.</li>
                    </ul>
                <li>For creating and editing new presets you have the following options:</li>
                    <ul>
                    <li><b>import as stanza</b>: this button imports the contents of the source pad directly into the stanza pad, preserving line-breaks, and returns you to the stanza pad with the imported stanza ready to be worked on. The contents of the source pad are not saved, and are lost upon clicking this button. This is a useful option if you wish to remix a pre-existing stanza/poem, whether your own or someone elses.</li>
                        <li><b>new preset</b>: create a new, blank preset</li>
                        <li><b>save as new preset</b>: this will add a new preset to the dropdown menu for selection on the Stanza Pad, using the name and text provided in the fields.</li>
                        <li><b>save as current preset</b>: as above, only here it will overwrite whichever preset is currently selected in the ‘current preset’ dropdown menu.</li>
                        <li><b>delete preset</b>: deletes the current preset from the preset list</li>
                        <li><b>back</b>: when you are finished working in the Source Pad, click back to return to the Stanza Pad.</li>
                    </ul>
                
            </ul>
            <h3 id="global">GLOBAL SECTION</h3>
            <Image src={globalControls.src} height={globalControls.height / 2} width={globalControls.width /2}/>
            <p>This section monitors and controls some global settings for Stanzafier. All of these are available on the Stanza Pad; some are also available on the Poem Pad and Source Pad.</p>
            <ul>
                <li><b>STATUS</b>: any update or error messages are displayed here.</li>
                <li><b>CURRENT FORM</b>: the form of the current contents of the Stanza Pad is displayed here.</li>
                <li><b># OF STANZAS</b>: the total number of stanzas in your poem is displayed here.</li>
                <li><b>base font</b> and <b>size</b>: set the base font for Stanzafier, applied across Stanza Pad, Word Bank, Poem Pad and Output screens.</li>
                <li><b>SAVE STATE</b>: saves everything you’re working on – current stanza and poem, Word Bank and any additionally created word lists, any new presets added, all typographical styles, etc. – to a file in json format. The file will have the name ‘state-[poem-title].json’.</li>
                <li><b>LOAD STATE</b>: loads any previously saved file to restore Stanzafier to that state.</li>
                <li><b>HELP/DOCS</b>: takes you to the text you are currently reading.</li>
            </ul>
        <h2 id="bugs">KNOWN BUGS</h2>
        <p>As previously mentioned Stanzafier is still in an early stage of development so some bugs remain. These include:</p>
        <ul>
            <li>Performance issues: longer stanza forms, larger source texts and using n-grams (i.e. setting n-level at 2-9, especially at the higher end) can create severe performance issues, especially when used in combination. If you are encountering such issues, try using a shorter form or shorter source text. </li>
            <li>Grabbing comments from a YouTube url has been known to crash the app, so be sure to save your work beforehand. (This should be fixed now.)</li>
            <li>Populating the Word Bank via LLM often randomly clips the first letter from added words.</li>
            <li>CURRENT FORM does not always accurately represent line-breaks.</li>
            <li>Word Bank Populate (word list) is supposed to exempt duplicate words, but a single dupe word is added if there are no other non-dupe words left in the word list.</li>
        </ul>
        <h2 id="features">FUTURE FEATURES</h2>
        <p>Future features planned for Stanzafier include but are not limited to:</p>
        <ul>
            <li>Preset mashup mode: select two presets at once to create poetic mashups (in the meantime this can be done manually by adding discrete source texts to a single preset text, as in the ‘tintern wasted’ built-in preset).</li>
            <li>Regenerate selected: part-regenerate stanzas to create new Yahtzee-esque creative possibilities.</li>
            <li>Freeform mode: drag n drop on Stanza Pad to assist creation of concrete poetry.</li>
            <li>More FX including more complex LLM interactions.</li>
            <li>A programmable interface to auto-produce extended permutational sequences.</li>
            <li>More/better fonts.</li>
            <li>Knobs!</li>
            <li>And more...</li>
            <li>(And if there is a particular feature you would like to see, get in touch!)</li>
        </ul>
        <h2 id="credits">CREDITS</h2>
        <p>Stanzafier was made by Calum Rodger with additional coding support and “glider” logo by Sebastian Charles. With thanks to alpha testers Erin Beckett, Nicky Melville and Dan Power.</p>
        <p>Explore more of Rodger’s work at <Link href="/" legacyBehavior passHref><a target="_blank">his website</a></Link> (opens in a new tab).</p>
        <h2 id="further-reading">FURTHER READING</h2>
        <p>Eleven years prior to building Stanzafier, its creator Calum Rodger (at the time a PhD student in Scottish Literature) published award-winning research on poetry-generating computer programs, focusing on two such examples - JanusNode and Gnoetry. Read this original article <Link href="/reading-the-drones" legacyBehavior passHref><a target="_blank">here</a></Link>.</p>
        </div>
        
        <div className={classes.panel}>
            <Title onSetDocsMode={onSetDocsMode}/>
            <Link href="#contents" className={classes.button}>contents</Link>
            <button className={classes.button} onClick={onSetDocsMode}>back</button>
        </div>
        </>
    )
}

export default Docs;