import axios from '../../config/axios';
import * as actionTypes from './actionTypes';

const fetchTodosSuccess = todos => {
    return {
        type: actionTypes.FETCHTODOSSUCCESS,
        todos
    }
};

const fetchTodosFailed = error => {
    return {
        type: actionTypes.FETCHTODOSFAILED,
        error
    }
};

const writeTodosSuccess = (todos) => {
    return {
        type: actionTypes.WRITETODOSSUCCESS,
        todos
    }
};

const writeTodosFailed = (error) => {
    return {
        type: actionTypes.WRITETODOSFAILED,
        error
    }
};

const deleteTodoSuccess = (todos) => {
    return {
        type: actionTypes.DELETETODOSUCCESS,
        todos
    }
};

const deleteTodoFailed = (msg) => {
    return {
        type: actionTypes.DELETETODOFAILED,
        msg
    }
};

const patchTodoSuccess = (todos) => {
    return {
        type: actionTypes.PATCHTODOSUCCESS,
        todos
    }
};

const patchTodoFailed = (msg) => {
    return {
        type: actionTypes.PATCHTODOSUCCESS,
        msg
    }
};

export const fetchTodos = () => {
    return dispatch => {
        axios.get('/todos', { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(todos => {
                dispatch(fetchTodosSuccess(todos.data.todos));
            }).catch(err => {
                dispatch(fetchTodosFailed(err.message));
            })
    }
};

export const writeTodos = (todo) => {
    return dispatch => {
        axios.post('/todos', { text: todo }, { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(todos => {
                dispatch(writeTodosSuccess(todos.data));
            })
            .catch(err => dispatch(writeTodosFailed(err.message)));
    }
};

export const deleteTodo = (id) => {
    return dispatch => {
        axios.delete(`/todos/${id}`, { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(todos => {
                dispatch(deleteTodoSuccess(todos.data));
            })
            .catch(err => dispatch(deleteTodoFailed(err.message)));
    }
};

export const patchTodo = (id, completed) => {
    return dispatch => {
        axios.patch(`/todos/${id}`, { completed: !completed }, { headers: { "x-auth": localStorage.getItem('userId') } })
            .then(todos => dispatch(patchTodoSuccess(todos.data)))
            .catch(err => dispatch(patchTodoFailed(err.message)));
    }
};