import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Dispatch } from 'redux';
import { getInitialData } from '../utils/api';
import { IAuthUserAction } from './authedUser';
import { QuestionActionTypes, receiveQuestions } from './questions';
import { receiveUsers, UserActionTypes } from './users';

export type ReduxAction = QuestionActionTypes | UserActionTypes | IAuthUserAction;

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
