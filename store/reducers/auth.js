import { LOGIN, AUTHENTICATE } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    userSurname: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                userName: action.userName,
                userSurname: action.userSurname
            }
        
        default:
            return state;
    }
};