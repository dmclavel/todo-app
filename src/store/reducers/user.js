import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uid: null,
    creatorId: null,
    username: null,
    email: null,
    loginError: null,
    signupError: null,
    authListen: false,
    authDone: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STARTAUTHLISTEN: 
            return {
                ...state,
                authListen: true
            }
        case actionTypes.AUTHENTICATED:
            return {
                ...state,
                uid: action.token,
                creatorId: action.creatorId,
                username: action.username,
                email: action.email,
                loginError: null,
                signupError: null,
                authListen: false,
                authDone: true
            }
        case actionTypes.UNAUTHENTICATED:
            return {
                ...state,
                uid: null,
                creatorId: null,
                username: null,
                email: null,
                loginError: null,
                signupError: null,
                authListen: false,
                authDone: true
            }
        case actionTypes.LOGINSUCCESS:
            return {
                ...state,
                uid: action.token,
                creatorId: action.creatorId,
                username: action.username,
                email: action.email,
                loginError: null
            };
        case actionTypes.LOGINFAILED:
            return {
                ...state,
                loginError: action.error
            };
        case actionTypes.SIGNUPSUCCESS:
            return {
                ...state,
                uid: action.token,
                creatorId: action.creatorId,
                username: action.username,
                email: action.email,
                signupError: null
            };
        case actionTypes.SIGNUPFAILED:
            return {
                ...state,
                signupError: action.error
            };
        case actionTypes.LOGOUTSUCCESS:
            return {
                ...state,
                uid: null,
                creatorId: null,
                username: null,
                email: null,
                loginError: null,
                signupError: null
            };
        default:
            return state;
    }
};

export default reducer;