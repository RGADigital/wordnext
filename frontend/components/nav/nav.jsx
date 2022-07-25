import styles from './nav.module.scss';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <a href="/">
                <small>RGA</small>
            </a>
            <a href="/frequent-questions">Frequent Questions</a>
        </nav>
    );
};

export default Nav;
