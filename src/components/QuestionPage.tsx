import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { IStoreState } from '../reducers';
import { IUser } from '../utils/_DATA';
import NavBar from './NavBar';
import QuestionDetailedCard from './QuestionDetailedCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            marginTop: theme.spacing(3)
        }
    })
);

const QuestionPage: FC = () => {
    const classes = useStyles();
    const { id } = useParams() as { id: string };

    const doesNotExist: boolean = useSelector((state: IStoreState) => {
        const { questions } = state;

        return questions[id] === null || questions[id] === undefined;
    });

    if (doesNotExist) {
        return <Redirect to="/404" />;
    }
    const questionOwner: IUser = useSelector((state: IStoreState) => {
        const { users, questions } = state;

        const authorId: string = questions[id].author;

        return users[authorId];
    });

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md" className={classes.mainContainer}>
                <QuestionDetailedCard author={questionOwner} id={id} />
            </Container>
        </Fragment>
    );
};

export default QuestionPage;
