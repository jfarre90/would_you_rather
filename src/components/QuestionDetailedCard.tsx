import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IStoreState } from '../reducers';
import { IQuestion, IUser } from '../utils/_DATA';
import QuestionSelect from './QuestionSelect';

const useStyles = makeStyles((theme: Theme) =>
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
        },
        selectOption: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: theme.spacing(1),
            borderRadius: theme.spacing(1),
            border: '1px solid gray',
            margin: theme.spacing(2)
        },
        selectText: {
            marginRight: theme.spacing(2)
        },
        selected: {
            backgroundColor: green[500],
            borderWidth: '5px',
            borderColor: 'black'
        }
    })
);

type QuestionDetailedCardProps = {
    author: IUser;
    id: string;
};

const QuestionDetailedCard: FC<QuestionDetailedCardProps> = ({ author, id }) => {
    const classes = useStyles();

    const question: IQuestion = useSelector((state: IStoreState) => {
        const { questions } = state;

        return questions[id];
    });

    const optionAnswered: string = useSelector((state: IStoreState) => {
        const { users, authedUser } = state;

        return users[authedUser].answers[id];
    });

    const isQuestionAnswered: boolean = optionAnswered !== null && optionAnswered !== undefined;

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    return (
        <Card variant="outlined" raised={true}>
            <CardHeader
                className={classes.cardHeader}
                avatar={<Avatar alt={author.name} src={author.avatarURL} />}
                title={
                    <Typography variant="h5" component="h2">
                        {author.name} asked ...Would you rather...
                    </Typography>
                }
            ></CardHeader>
            <CardContent className={classes.cardContent}>
                <Box className={`${classes.selectOption} + ${optionAnswered === 'optionOne' ? classes.selected : ''}`}>
                    <Typography variant="h5" component="h5" className={classes.selectText}>
                        {question.optionOne.text}
                    </Typography>
                    {!isQuestionAnswered ? (
                        <QuestionSelect optionId="optionOne" questionId={id} />
                    ) : (
                        <div>
                            <h3>{question.optionOne.votes.length} Votes</h3>
                            <h3>{(question.optionOne.votes.length / totalVotes) * 100} % of total votes</h3>
                        </div>
                    )}
                </Box>
                <Typography variant="h2" component="h2">
                    OR
                </Typography>
                <Box className={`${classes.selectOption} + ${optionAnswered === 'optionTwo' ? classes.selected : ''}`}>
                    <Typography variant="h5" component="h5" className={classes.selectText}>
                        {question.optionTwo.text}
                    </Typography>
                    {!isQuestionAnswered ? (
                        <QuestionSelect optionId="optionTwo" questionId={id} />
                    ) : (
                        <div>
                            <h3>{question.optionTwo.votes.length} Votes</h3>
                            <h3>{(question.optionTwo.votes.length / totalVotes) * 100} % of total votes</h3>
                        </div>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

QuestionDetailedCard.propTypes = {
    author: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired
};

export default QuestionDetailedCard;
