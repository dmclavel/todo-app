import * as actionTypes from './actionTypes';
import axios from '../../config/axios';

const loginSuccess = (email, token, creatorId) => {
    return {
        type: actionTypes.LOGINSUCCESS,
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

const signupSuccess = (email, token, creatorId) => {
    return {
        type: actionTypes.SIGNUPSUCCESS,
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

const authenticated = (email, token, creatorId) => {
    return {
        type: actionTypes.AUTHENTICATED,
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
        axios.get('/users/me', { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(user => {
                if (user.data === "")
                    dispatch(unauthenticated());
                else 
                    dispatch(authenticated(user.data.email, user.config.headers['x-auth'], user.data._id));
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
                localStorage.setItem('userId', user.headers['x-auth']);
                dispatch(loginSuccess(user.data.email,user.headers['x-auth'], user.data._id));
            })
            .catch(() => {
                dispatch(loginFailed('Password and email don\'t match'));
            });

    }
};

export const signup = (email, password) => {
    return dispatch => {
        axios.post('/users', { email, password })
            .then(user => {
                localStorage.setItem('userId', user.headers['x-auth']);
                dispatch(signupSuccess(user.data.email,user.headers['x-auth'], user.data._id));
            })
            .catch(() => {
                dispatch(signupFailed('Email already exists!'));
            });
    }
};

export const logout = () => {
    return dispatch => {
        axios.delete('/users/me/token', {
            headers: {
                "x-auth": localStorage.getItem('userId')
            }
        }).then(() => {
            localStorage.removeItem('userId');
            dispatch(logoutSuccess());
        }).catch(() => {});
    }
};