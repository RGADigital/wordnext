import Container from '../../components/container';

const ArticleFull = ({ article }) => {
    return (
        <section>
            <Container>
                <article style={{ padding: '3rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem' }}>{article.title}</h2>
                        <span style={{ fontSize: '0.9rem' }}>{`${article.author} - ${article.date}`}</span>
                    </div>
                    <p>{article.body}</p>
                </article>
            </Container>
        </section>
    );
};

export default ArticleFull;
