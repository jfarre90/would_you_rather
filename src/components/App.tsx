import React, { Fragment } from 'react';
import { LoadingBar } from 'react-redux-loading';
import { Switch } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
    // const authUser = useSelector(state => state.authUser);
    // const loading = useSelector(state => state.authUser === null);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(handleInitialData());
    // }, [authUser])

    return (
        <Switch>
            <Fragment>
                <LoadingBar />
                <h1>Hello world</h1>
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
