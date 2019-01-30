import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [],
    writeError: null,
    deleteFailedMsg: null,
    patchFailedMsg: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCHTODOSSUCCESS:
            return {
                ...state,
                todos: action.todos
            }
        case actionTypes.FETCHTODOSFAILED:
            return {
                ...state,
                todos: []
            }
        case actionTypes.WRITETODOSSUCCESS:
            return {
                ...state,
                writeError: null,
                todos: action.todos
            }
        case actionTypes.WRITETODOSFAILED:
            return {
                ...state,
                writeError: action.error
            }
        case actionTypes.DELETETODOSUCCESS:
            return {
                ...state,
                todos: action.todos,
                deleteFailedMsg: null
            }
        case actionTypes.DELETETODOFAILED:
            return {
                ...state,
                deleteFailedMsg: action.msg
            }
        case actionTypes.PATCHTODOSUCCESS:
            return {
                ...state,
                todos: action.todos,
                patchFailedMsg: null
            }
        case actionTypes.PATCHTODOFAILED:
            return {
                ...state,
                patchFailedMsg: action.msg
            }
        default:
            return state;
    }
};

export default reducer;