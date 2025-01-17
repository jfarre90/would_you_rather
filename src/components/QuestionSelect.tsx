import { Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAnswer } from '../actions/questions';
import { IStoreState } from '../reducers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    })
);

type QuestionSelectProps = {
    optionId: string;
    questionId: string;
};

const QuestionSelect: FC<QuestionSelectProps> = ({ optionId, questionId }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const timer = useRef<number>();

    const dispatch = useDispatch();

    const authUser: string = useSelector((state: IStoreState) => state.authedUser);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        optionId;
        if (!loading) {
            setLoading(true);

            dispatch(saveAnswer(questionId, optionId, authUser));

            timer.current = window.setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button variant="contained" color="primary" disabled={loading} onClick={handleButtonClick}>
                    Select
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
};

QuestionSelect.propTypes = {
    optionId: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired
};

export default QuestionSelect;
