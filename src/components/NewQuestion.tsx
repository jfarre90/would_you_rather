import {
    Container,
    createStyles,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    makeStyles,
    Theme
} from '@material-ui/core';
import { FC, FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import { IStoreState } from '../reducers';
import NavBar from './NavBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            marginTop: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifycontent: 'space-between',
            alignItems: 'center'
        },
        button: {
            margin: theme.spacing(5),
            width: '250px',
            height: '100px'
        }
    })
);

const NewQuestion: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const authUser: string = useSelector((state: IStoreState) => state.authedUser);

    const [input, setInput] = useState({ optionOne: '', optionTwo: '' });

    const handleInputChange = (event: any) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { optionOne, optionTwo } = input;

        if (optionOne === optionTwo) {
            alert('The options are the same. Please add different options');
            return;
        }

        dispatch(handleAddQuestion(optionOne, optionTwo, authUser));

        history.push('/');
    };

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md" className={classes.mainContainer}>
                <h3>Add your new question</h3>
                <h4>Would you rather...</h4>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <FormControl>
                        <InputLabel htmlFor="option-one-input">Option One</InputLabel>
                        <Input
                            id="option-one-input"
                            name="optionOne"
                            value={input['optionOne']}
                            onChange={handleInputChange}
                            aria-describedby="option-one-text"
                        />
                        <FormHelperText id="option-one-text">Add the first option</FormHelperText>
                    </FormControl>
                    <h4>OR</h4>
                    <FormControl>
                        <InputLabel htmlFor="option-two-input">Option Two</InputLabel>
                        <Input
                            id="option-two-input"
                            name="optionTwo"
                            value={input['optionTwo']}
                            onChange={handleInputChange}
                            aria-describedby="option-two-text"
                        />
                        <FormHelperText id="option-two-text">Add the second option</FormHelperText>
                    </FormControl>
                    <button
                        className={classes.button}
                        type="submit"
                        disabled={input['optionOne'] === '' || input['optionTwo'] === ''}
                    >
                        Submit
                    </button>
                </form>
            </Container>
        </Fragment>
    );
};

export default NewQuestion;
