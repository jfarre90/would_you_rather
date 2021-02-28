import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading';
import { DefaultRootState } from 'react-redux';
import { IQuestion, IUser } from '../utils/_DATA';

export interface IStoreState extends DefaultRootState {
    authedUser: string;
    questions: { [key: string]: IQuestion };
    users: { [key: string]: IUser };
}

export default combineReducers({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer
});
