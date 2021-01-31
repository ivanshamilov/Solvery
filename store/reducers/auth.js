import { LOGIN, AUTHENTICATE } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    user: null,
    userName: null,
    userSurname: null
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
        
        default:
            return state;
    }
};