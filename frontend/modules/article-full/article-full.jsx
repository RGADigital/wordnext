import { Container } from '../../components';
import styles from './article-full.module.scss';

const ArticleFull = ({ article }) => {
    return (
        <section className={styles.wrapper}>
            <Container>
                <article>
                    <div className={styles.header}>
                        <h2>{article.title}</h2>
                        <span
                            className={styles.sub_header}
                        >{`${article.author} - ${article.date}`}</span>
                    </div>
                    <p>{article.body}</p>
                </article>
            </Container>
        </section>
    );
};

export default ArticleFull;
