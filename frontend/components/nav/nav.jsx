import styles from './nav.module.scss';
import Link from 'next/link';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/" passHref>
                <small>RGA</small>
            </Link>
            <Link href="/frequent-questions">Frequent Questions</Link>
        </nav>
    );
};

export default Nav;
