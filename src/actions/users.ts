import { IUser } from '../utils/_DATA';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export interface IReceivedUsersAction {
    type: string;
    users: { [key: string]: IUser };
}

export function receiveUsers(users: { [key: string]: IUser }): IReceivedUsersAction {
    return {
        type: RECEIVE_USERS,
        users
    };
}
