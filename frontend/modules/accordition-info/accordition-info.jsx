import Container from '../../components/container';

const AccorditionInfo = ({ accorditionData }) => {
    return (
        <section>
            <ul>
                {accorditionData.map((question, index) => {
                    return (
                        <li key={`${question.title}${index}`} style={{ marginBottom: '2rem' }}>
                            <Container>
                                <details>
                                    <summary>{question.title}</summary>
                                    <p>{question.description}</p>
                                </details>
                            </Container>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default AccorditionInfo;
