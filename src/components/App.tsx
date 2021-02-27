import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

const App: React.FC = () => {
  const authUser = useSelector(state => state.authUser);
  const loading = useSelector(state => state.authUser === null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [authUser])

  return (
    <Switch>
      <Fragment>
        <LoadingBar />
        <div className="container">

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
        </div>
      </Fragment>
    </Switch>
  );
}

export default App;
