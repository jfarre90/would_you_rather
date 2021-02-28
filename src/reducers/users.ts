import { IReceivedUsersAction, RECEIVE_USERS } from '../actions/users';

export default function users(state = {}, action: IReceivedUsersAction | any): any {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        default:
            return state;
    }
}
