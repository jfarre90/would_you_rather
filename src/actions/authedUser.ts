export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export interface IAuthUserAction {
    type: typeof SET_AUTHED_USER;
    id: string;
}

export function setAuthedUser(id: string): IAuthUserAction {
    return {
        type: SET_AUTHED_USER,
        id
    };
}
