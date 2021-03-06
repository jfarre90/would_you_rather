import PropTypes from 'prop-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IStoreState } from '../reducers';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const isAuthUserSet: boolean = useSelector((state: IStoreState) => state.authedUser !== null);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthUserSet ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.any.isRequired,
    path: PropTypes.string.isRequired
};

export default PrivateRoute;
