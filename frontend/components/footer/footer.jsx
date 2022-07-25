import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <small style={{ fontSize: '2rem' }}>© RGA</small>
        </footer>
    );
};

export default Footer;
