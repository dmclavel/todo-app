import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [],
    writeError: null,
    deleteSuccessMsg: null,
    deleteFailedMsg: null,
    patchSuccessMsg: null,
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
                writeError: null
            }
        case actionTypes.WRITETODOSFAILED:
            return {
                ...state,
                writeError: action.error
            }
        case actionTypes.DELETETODOSUCCESS:
            return {
                ...state,
                deleteSuccessMsg: action.msg,
                deleteFailedMsg: null
            }
        case actionTypes.DELETETODOFAILED:
            return {
                ...state,
                deleteFailedMsg: action.msg,
                deleteSuccessMsg: null
            }
        case actionTypes.PATCHTODOSUCCESS:
            return {
                ...state,
                patchSuccessMsg: action.msg,
                patchFailedMsg: null
            }
        case actionTypes.PATCHTODOFAILED:
            return {
                ...state,
                patchFailedMsg: action.msg,
                patchSuccessMsg: null
            }
        default:
            return state;
    }
};

export default reducer;