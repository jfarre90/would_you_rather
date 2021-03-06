import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import NavBar from './NavBar';
import UserStatsCard from './UserStatsCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            marginTop: theme.spacing(3)
        },
        unstyledList: {
            listStyleType: 'none',
            padding: '10px',
            textDecoration: 'none'
        }
    })
);

const Leaderboard: FC = () => {
    const classes = useStyles();

    const userIds: string[] = useSelector((state: IStoreState) => {
        const { users } = state;

        return Object.keys(users).sort(
            (a, b) =>
                Object.keys(users[b].answers).length +
                users[b].questions.length -
                Object.keys(users[a].answers).length -
                users[a].questions.length
        );
    });

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md" className={classes.mainContainer}>
                <ul>
                    {userIds.map((userId: string) => (
                        <li key={userId} className={classes.unstyledList}>
                            <UserStatsCard id={userId} />
                        </li>
                    ))}
                </ul>
            </Container>
        </Fragment>
    );
};

export default Leaderboard;
