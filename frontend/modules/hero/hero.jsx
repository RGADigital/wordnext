import styles from './hero.module.scss';

const Hero = ({ heroData }) => {
    return (
        <section
            className={styles.wrapper}
            style={{ backgroundColor: heroData.backgroundColor }}
        >
            <div className={styles.content}>
                <h2>{heroData.title}</h2>
                <p>{heroData.body}</p>
            </div>
        </section>
    );
};

export default Hero;
