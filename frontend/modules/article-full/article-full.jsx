import { Container } from '../../components';
import styles from './article-full.module.scss';

const ArticleFull = ({ article }) => {
    return (
        <section>
            <Container>
                <article className={styles.article}>
                    <div className={styles.header}>
                        <h2>{article.title}</h2>
                        <span
                            className={styles.subheader}
                        >{`${article.author} - ${article.date}`}</span>
                    </div>
                    <p>{article.body}</p>
                </article>
            </Container>
        </section>
    );
};

export default ArticleFull;
