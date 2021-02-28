import { Container } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IStoreState } from '../reducers';
import { IQuestion } from '../utils/_DATA';
import NavBar from './NavBar';

const QuestionPage: FC = () => {
    const { id } = useParams() as { id: string };

    const question: IQuestion = useSelector((state: IStoreState) => {
        const { questions } = state;

        return questions[id];
    });

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md">
                <h1>Would you rather...</h1>
                <h3>Option 1</h3>
                <p>{question.optionOne.text}</p>
                OR
                <h3>Option 2</h3>
                <p>{question.optionTwo.text}</p>
            </Container>
        </Fragment>
    );
};

export default QuestionPage;
