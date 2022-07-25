import Container from '../../components/container';

const SquareArticle = ({ articleData }) => {
    return (
        <section>
            <ul style={{ display: 'flex', flexDirection: 'row' }}>
                {articleData.map((article, index) => (
                    <li key={`${article.title}${index}`} style={{ width: '50%' }}>
                        <Container>
                            <article style={{ borderRadius: '5px', boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.12)' }}>
                                <a alt={article.url.title} href={article.url.url}>
                                    <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src={article.image.sourceUrl} />
                                    <div style={{ padding: '2rem' }}>
                                        <h3>{article.title}</h3>
                                        <p>{article.description}</p>
                                    </div>
                                </a>
                            </article>
                        </Container>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SquareArticle;
