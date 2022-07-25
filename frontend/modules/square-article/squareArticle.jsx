import { Container } from '../../components';
import styles from './square-article.module.scss';

const SquareArticle = ({ articleData }) => {
    return (
        <section className={styles.wrapper}>
            <Container>
                <ul>
                    {articleData.map((article, index) => (
                        <li key={`${article.title}${index}`}>
                            <article>
                                <a
                                    alt={article.url.title}
                                    href={article.url.url}
                                >
                                    <img src={article.image.sourceUrl} />
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
