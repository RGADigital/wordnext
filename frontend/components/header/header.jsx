import styles from './header.module.scss';
import Link from 'next/link';

const Header = ({ data }) => {
    return (
        <nav className={styles.nav}>
            <Link href={data.leftSection.url} passHref>
                <a>
                    <small>{data.leftSection.title}</small>
                </a>
            </Link>
            <Link href={data.rightSection.url}>{data.rightSection.title}</Link>
        </nav>
    );
};

export default Header;
