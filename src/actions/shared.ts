import { showLoading } from 'react-redux-loading';
import { Dispatch } from 'redux';
import { getInitialData } from '../utils/api';

export function handleInitialData() {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(showLoading());

        return getInitialData().then();
        //     ({ users, questions }) => {
        //     dispatch(setAuthedUser(AUTHED_ID));
        //     dispatch(hideLoading());
        // }
    };
}
