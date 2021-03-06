import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { handleInitialData } from '../actions/shared';
import { IStoreState } from '../reducers';

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

const Login: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const authUser: string = useSelector((state: IStoreState) => state.authedUser);

    const userIds: string[] = useSelector((state: IStoreState): string[] => {
        const { users } = state;

        return Object.keys(users);
    });

    const { from } = (location.state || { from: { pathname: '/' } }) as { [key: string]: { pathname: string } };

    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = useState('');

    const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
        event.preventDefault();

        setSelectedUser(event.target.value as string);
    };

    const handleLoginClick = (event: MouseEvent<{ value: unknown }>) => {
        event.preventDefault();

        dispatch(setAuthedUser(selectedUser));
        dispatch(handleInitialData());

        history.push(from);
    };

    return authUser ? (
        <Redirect to="/" />
    ) : (
        <Container maxWidth="md" className={classes.marginAutoContainer}>
            <h1>Welcome to the Would you Rather app. Please log in:</h1>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Select user</InputLabel>
                <Select
                    className={classes.selectEmpty}
                    labelId="user-selection"
                    value={selectedUser}
                    onChange={handleSelectChange}
                >
                    {userIds.map((userId: string) => (
                        <MenuItem key={userId} value={userId}>
                            {userId}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                className={classes.button}
                color="primary"
                disabled={selectedUser === ''}
                onClick={handleLoginClick}
            >
                Login
            </Button>
        </Container>
    );
};

export default Login;
