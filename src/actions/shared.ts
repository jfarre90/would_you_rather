import { hideLoading, showLoading } from 'react-redux-loading';
import { Dispatch } from 'redux';
import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(showLoading());

        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        });
    };
}
