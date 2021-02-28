import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IStoreState } from '../reducers';
import { IQuestion } from '../utils/_DATA';

type QuestionProps = {
    id: string;
};

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    media: {
        height: 140
    }
});

const Question: FC<QuestionProps> = ({ id }) => {
    const classes = useStyles();
    const history = useHistory();

    const question: IQuestion = useSelector((state: IStoreState) => {
        const { questions } = state;

        return questions[id];
    });

    const handleQuestionClick = () => {
        history.push(`/questions/${id}`);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleQuestionClick}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Would you rather...
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {question.optionOne.text}... OR ...
                    </Typography>
                </CardContent>
                <Typography variant="body2">Posted by: {question.author}</Typography>
            </CardActionArea>
        </Card>
    );
};

Question.propTypes = {
    id: PropTypes.string.isRequired
};

export default Question;
