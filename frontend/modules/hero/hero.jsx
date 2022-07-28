import styles from './hero.module.scss';
import { useTranslations } from 'next-intl';

const Hero = ({ backgroundColor, title, body }) => {
    const t = useTranslations('Hero');

    return (
        <section
            className={styles.wrapper}
            style={{ backgroundColor: backgroundColor }}
        >
            <div className={styles.content}>
                <h1>{t('test')}</h1>
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </section>
    );
};

export default Hero;
