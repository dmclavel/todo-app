import * as actionTypes from './actionTypes';
import axios from '../../config/axios';

const loginSuccess = (username, email, token, creatorId) => {
    return {
        type: actionTypes.LOGINSUCCESS,
        username,
        email, 
        token,
        creatorId
    }
};

const loginFailed = (error) => {
    return {
        type: actionTypes.LOGINFAILED,
        error
    }
};

const signupSuccess = (username, email, token, creatorId) => {
    return {
        type: actionTypes.SIGNUPSUCCESS,
        username,
        email, 
        token,
        creatorId
    }
};

const signupFailed = (error) => {
    return {
        type: actionTypes.SIGNUPFAILED,
        error
    }
};

const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUTSUCCESS
    }
};

const startAuthListen = () => {
    return {
        type: actionTypes.STARTAUTHLISTEN
    }
};

const authenticated = (username, email, token, creatorId) => {
    return {
        type: actionTypes.AUTHENTICATED,
        username,
        email,
        token,
        creatorId
    }
};

const unauthenticated = () => {
    return {
        type: actionTypes.UNAUTHENTICATED
    }
};

export const authListen = () => {
    return dispatch => {
        dispatch(startAuthListen());
        axios.get('/users/me', { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(user => {
                if (user.data === "")
                    dispatch(unauthenticated());
                else 
                    dispatch(authenticated(user.data.username, user.data.email, user.config.headers['x-auth'], user.data._id));
            })
            .catch(() => {
                dispatch(unauthenticated());
            });
    }
};

export const login = (email, password) => {
    return dispatch => {
        axios.post('/users/login', { email, password })
            .then(user => {
                console.log(user);
                localStorage.setItem('userId', user.headers['x-auth']);
                dispatch(loginSuccess(user.data.username, user.data.email,user.headers['x-auth'], user.data._id));
            })
            .catch(() => {
                dispatch(loginFailed('Password and email don\'t match'));
            });

    }
};

export const signup = (username, email, password) => {
    return dispatch => {
        axios.post('/users', { username, email, password })
            .then(user => {
                console.log(user);
                localStorage.setItem('userId', user.headers['x-auth']);
                dispatch(signupSuccess(user.data.username, user.data.email,user.headers['x-auth'], user.data._id));
            })
            .catch(() => {
                dispatch(signupFailed('Email already exists!'));
            });
    }
};

export const logout = () => {
    return async dispatch => {
        await axios.delete('/users/me/token', {
            headers: {
                "x-auth": localStorage.getItem('userId')
            }
        }).then(() => {
            localStorage.removeItem('userId');
            dispatch(logoutSuccess());
        }).catch(() => {});
    }
};