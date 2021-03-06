import { REMOVE_ANSWER, SEND_ANSWER } from '../actions/questions';
import { ReduxAction } from '../actions/shared';
import { RECEIVE_USERS } from '../actions/users';
import { IUser } from '../utils/_DATA';

export default function users(state: { [userId: string]: IUser } = {}, action: ReduxAction): any {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case SEND_ANSWER:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    answers: {
                        ...state[action.userId].answers,
                        [action.questionId]: action.answerId
                    }
                }
            };
        case REMOVE_ANSWER:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    answers: {
                        ...state[action.userId].answers,
                        [action.questionId]: null
                    }
                }
            };
        default:
            return state;
    }
}
