import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const signup = (email, username, name, surname, password) => {
    // email, username, name, surname, password
    return async dispatch => {
        const response = await fetch('https://application-pwr.herokuapp.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    name: name,
                    surname: surname,
                    password: password
                })
            })
            const responseData = await response.json();
            dispatch({
                type: AUTHENTICATE,
                token: responseData.token,
                userId: responseData.user.userId,
                userName: responseData.user.name,
                userSurname: responseData.user.surname
            })
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://application-pwr.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const responseData = await response.json();
            dispatch({
                type: AUTHENTICATE,
                token: responseData.token,
                userId: responseData.user.userId,
                userName: responseData.user.name,
                userSurname: responseData.user.surname
            })
    };
};