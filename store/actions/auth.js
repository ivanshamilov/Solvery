
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_PHOTO = 'UPDATE_USER_PHOTO';
export const UPDATE_USER_PROGRESS = 'UPDATE_USER_PROGRESS';

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
                user: responseData.user,
                userId: responseData.user._id,
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
                userId: responseData.user._id,
                user: responseData.user,
                userName: responseData.user.name,
                userSurname: responseData.user.surname,
            })
    };
};

export const update_user_progress = (user_id, level_id, updated_progress, token) => {
    return async dispatch => {
        const response = await fetch('https://application-pwr.herokuapp.com/auth/update_user_progress', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user_id,
                level_id: level_id,
                updated_progress: updated_progress
            })
        });
        const responseData = await response.json();
        dispatch({
            type: UPDATE_USER_PROGRESS,
            user: responseData.user
        })
    }
};

export const update_user_photo = (user_id, image_str, token) => {
    return async dispatch => {
        const response = await fetch('https://application-pwr.herokuapp.com/auth/update_user_photo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user_id,
                image_str: image_str
            })
        });
        const responseData = await response.json();
        dispatch({
            type: UPDATE_USER_PHOTO,
            user: responseData.user,
        })
    }
};

export const update_user = (user_id, token, email, username, name, surname, password, image_str) => {
    return async dispatch => {
        const response = await fetch('https://application-pwr.herokuapp.com/auth/update_user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user_id,
                email: email,
                username: username,
                name: name,
                surname: surname,
                password: password,
                image_str: image_str
            })
        });
        const responseData = await response.json();
        dispatch({
            type: UPDATE_USER,
            user: responseData.user,
        })
    }
};