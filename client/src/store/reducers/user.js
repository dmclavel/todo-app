import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uid: null,
    creatorId: null,
    email: null,
    loginError: null,
    signupError: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATED:
            return {
                ...state,
                uid: action.token,
                creatorId: action.creatorId,
                email: action.email,
                loginError: null,
                signupError: null
            }
        case actionTypes.UNAUTHENTICATED:
            return state;
        case actionTypes.LOGINSUCCESS:
            return {
                ...state,
                uid: action.token,
                creatorId: action.creatorId,
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
                email: null,
                loginError: null,
                signupError: null
            };
        default:
            return state;
    }
};

export default reducer;