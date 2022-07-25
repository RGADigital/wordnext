import { Container } from '../../components';
import styles from './accordition-info.module.scss';

const AccorditionInfo = ({ accorditionData }) => {
    return (
        <section className={styles.wrapper}>
            <ul>
                {accorditionData.map((question, index) => {
                    return (
                        <li key={`${question.title}${index}`}>
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
