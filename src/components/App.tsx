import { Fragment, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';
import { Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { IStoreState } from '../reducers';
import Home from './Home';
import Login from './Login';
import QuestionPage from './QuestionPage';

const App: FC = () => {
    // const users = useSelector((state: IStoreState) => state.users);
    // const questions = useSelector((state: IStoreState) => state.questions);
    // const authUser = useSelector((state: IStoreState) => state.authUser);
    const loading = useSelector((state: IStoreState) => state.users === null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleInitialData());
    }, []);

    return (
        <Switch>
            <Fragment>
                <LoadingBar />
                {loading ? null : (
                    <div>
                        <Route Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/questions/:id">
                            <QuestionPage />
                        </Route>
                    </div>
                )}
                {/* <div className="container">

                    {loading
                        ? null
                        : <div>
                            <Route exact path="/">

                            </Route>
                            <Route path="/tweet/:id">

                            </Route>
                            <Route path="/new">

                            </Route>
                        </div>}
                </div> */}
            </Fragment>
        </Switch>
    );
};

export default App;
