import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';
import './Login.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marginAutoContainer: {
            height: '100vh',
            display: 'flex',
            marginTop: 0,
            marginBottom: 0,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: 'green'
        },
        formControl: {
            // margin: 'auto',
            minWidth: '70%'
        },
        button: {
            marginTop: '3rem'
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

const Home: FC = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.marginAutoContainer}>
            <h1>Home placeholder</h1>
        </Container>
    );
};

export default Home;
