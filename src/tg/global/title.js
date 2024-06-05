import classes from './title.module.scss';
import Image from 'next/image';
import DadaPic from '../../../public/tg/dada.png';

const Title = (props) => {

    const {onSetDocsMode} = props;

    const pic = DadaPic.src;

    return (
        <div className={`${classes.container} ${!onSetDocsMode ? classes.onMainScreen : null}`}>
            <div className={classes.textContainer}>
                <div className={classes.topLine}>Stanzafier0.9</div>
                <div className={classes.bottomLine}>poem creation and remix tool</div>
            </div>
            <Image className={classes.logo} src={pic} alt="dada" width={36} height={36} />
        </div>
    )
}

export default Title;