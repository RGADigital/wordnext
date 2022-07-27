import { Container } from '../../components';
import styles from './square-article.module.scss';

const SquareArticle = ({ articleData }) => {
    return (
        <section className={styles.wrapper}>
            <Container>
                <ul className={styles.list}>
                    {articleData.map((article, index) => (
                        <li
                            className={styles.item}
                            key={`${article.title}${index}`}
                        >
                            <article className={styles.article}>
                                <a
                                    alt={article.url.title}
                                    href={article.url.url}
                                >
                                    <div className={styles.card_body}>
                                        <h3>{article.title}</h3>
                                        <p>{article.description}</p>
                                    </div>
                                </a>
                            </article>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};

export default SquareArticle;
