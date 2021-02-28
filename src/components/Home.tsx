import { Container } from '@material-ui/core';
import { FC, Fragment } from 'react';
import NavBar from './NavBar';
import QuestionsList from './QuestionsList';

const Home: FC = () => {
    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md">
                <QuestionsList />
            </Container>
        </Fragment>
    );
};

export default Home;
