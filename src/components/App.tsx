import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { IStoreState } from '../reducers';
import Home from './Home';
import Login from './Login';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import QuestionPage from './QuestionPage';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }
    })
);

const App: FC = () => {
    const authUser: string = useSelector((state: IStoreState) => state.authedUser);
    const loading = useSelector((state: IStoreState) => Object.entries(state.users).length === 0);

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleInitialData());
    }, [authUser]);

    return (
        <Fragment>
            <LoadingBar />

            {loading ? (
                <div className={classes.root}>
                    <CircularProgress size={100} />
                </div>
            ) : (
                <Switch>
                    <PrivateRoute exact path="/">
                        <Home />
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/questions/:id">
                        <QuestionPage />
                    </PrivateRoute>
                    <PrivateRoute path="/leaderboard">
                        <h1>Leaderboard placeholder</h1>
                    </PrivateRoute>
                    <PrivateRoute path="/add">
                        <NewQuestion />
                    </PrivateRoute>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            )}
        </Fragment>
    );
};

export default App;
