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
import { green } from '@material-ui/core/colors';
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
            flexDirection: 'column'
        },
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
            borderWidth: '2px'
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
        event.preventDefault();

        console.log('##### event', event);
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(handleAddQuestion(input.optionOne, input.optionTwo, authUser));

        history.push('/');
    };

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="md" className={classes.mainContainer}>
                <h3>Add your new question</h3>
                <h4>Would you rather...</h4>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={input['optionOne'] === '' || input['optionTwo'] === ''}>
                        Submit
                    </button>
                </form>
            </Container>
        </Fragment>
    );
};

export default NewQuestion;
