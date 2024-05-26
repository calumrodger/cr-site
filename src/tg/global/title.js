import classes from './title.module.scss';
import Image from 'next/image';
import DadaPic from '../../../public/tg/dada.png';

const Title = () => {

    const pic = DadaPic.src;

    return (
        <div className={classes.container}>
            <Image className={classes.logo} src={pic} alt="dada" width={36} height={36} />
            <div className={classes.textContainer}>
                <div className={classes.topLine}>Stanzafier</div>
                <div className={classes.bottomLine}>poem creation and remix tool</div>
            </div>
        </div>
    )
}

export default Title;