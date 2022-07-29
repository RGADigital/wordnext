import styles from './container.module.scss';

const Container = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default Container;
