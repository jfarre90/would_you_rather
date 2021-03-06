import { Avatar, Card, CardContent, CardHeader, createStyles, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import { IUser } from '../utils/_DATA';

const useStyles = makeStyles(() =>
    createStyles({
        cardHeader: {
            display: 'flex',
            flexDirection: 'column'
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    })
);

type UserStatsCardProps = {
    id: string;
};

/**
     * TODO
     * add the following properties to the card
     *  - user name
     *  - user picture
     *  - number questions asked
     *  - number questions ansered
     * - ordered in descending order based on teh sum of both numbers above (show number)

    */

const UserStatsCard: FC<UserStatsCardProps> = ({ id }) => {
    const classes = useStyles();

    const user: IUser = useSelector((state: IStoreState) => {
        const { users } = state;

        return users[id];
    });

    const questionsAnswered: number = Object.keys(user.answers).length;
    const questionsPosted: number = user.questions.length;

    const totalScore: number = questionsAnswered + questionsPosted;

    return (
        <Card variant="outlined" raised={true}>
            <CardHeader
                className={classes.cardHeader}
                avatar={<Avatar alt={user.id} src={user.avatarURL} />}
                title={
                    <Typography variant="h5" component="h2">
                        {user.id} - {user.name}
                    </Typography>
                }
            ></CardHeader>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6" component="h6">
                    Questions answered: {questionsAnswered}
                </Typography>
                <Typography variant="h6" component="h6">
                    Questions posted: {questionsPosted}
                </Typography>
                <Typography variant="h4" component="h4">
                    <strong>Score:</strong> {totalScore}
                </Typography>
            </CardContent>
        </Card>
    );
};

UserStatsCard.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserStatsCard;
