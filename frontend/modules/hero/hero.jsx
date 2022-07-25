import styles from './hero.module.scss';

const Hero = ({ backgroundColor, title, body }) => {
    return (
        <section
            className={styles.wrapper}
            style={{ backgroundColor: backgroundColor }}
        >
            <div className={styles.content}>
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </section>
    );
};

export default Hero;
