import { IUser } from '../utils/_DATA';

export const RECEIVE_USERS = 'RECEIVE_USERS';

interface IGetUsersAction {
    type: typeof RECEIVE_USERS;
    users: { [key: string]: IUser };
}

export type UserActionTypes = IGetUsersAction;

export function receiveUsers(users: { [key: string]: IUser }): UserActionTypes {
    return {
        type: RECEIVE_USERS,
        users
    };
}
