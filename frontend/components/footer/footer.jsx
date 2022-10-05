import styles from './footer.module.scss';

const Footer = ({ data }) => {
    return (
        <footer className={styles.footer}>
            <small style={{ fontSize: '2rem' }}>© {data.copyright}</small>
        </footer>
    );
};

export default Footer;
