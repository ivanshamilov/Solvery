import { AUTHENTICATE, UPDATE_USER_PROGRESS, UPDATE_USER_PHOTO } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    user: null,
    userName: null,
    userSurname: null,
    userPhoto: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                user: action.user,
                userName: action.userName,
                userSurname: action.userSurname
            }
        case UPDATE_USER_PROGRESS:
            return {
                ...state,
                user: action.user
            }
        case UPDATE_USER_PHOTO:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
};