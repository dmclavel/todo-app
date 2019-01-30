import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchTodos ,writeTodos, deleteTodo, patchTodo } from '../../store/actions/index';

import TodoList from '../../components/TodoList/TodoList';
import TodoButton from '../../components/TodoButton/TodoButton';

const TodoWrapper = styled.div`
    display: flex;
    width: 90%;
    height: 55%;
    position: absolute;
    z-index: -1;
    left: 5.5%;
    top: 20%;
`

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: '',
            addTodo: false
        }
    }

    componentDidMount () {
        this.props.onFetchTodos();
    }

    todoChange = e => {
        this.setState({ todo: e.target.value })
    }

    triggerAddTodo = () => {
        this.setState(prevState => ({ addTodo: !prevState.addTodo }));
    }

    clearLocalState = () => {
        this.setState({ todo: '', addTodo: false });
    }

    render () {
        let todoRedirect, todoContent;
        if (!this.props.uid && !this.props.authListen && this.props.authDone) {
            todoRedirect = <Redirect to="/" />;
        } else if (this.props.uid && !this.props.authListen && this.props.authDone) {
            todoContent = (
                <TodoWrapper>
                    <TodoList todos={this.props.todos} patched={(id, completed) => this.props.onPatchTodo(id, completed)} 
                                deleted={(id) => this.props.onDeleteTodo(id)} />
                    <TodoButton show={this.state.addTodo} clicked={this.triggerAddTodo} value={this.state.todo} changed={this.todoChange} submitted={(event) => {
                        event.preventDefault();
                        this.clearLocalState();
                        this.props.onWriteTodo(this.state.todo);
                    }} />
                </TodoWrapper>
            );
        }

        return (
            <Fragment>
                {todoRedirect}
                {todoContent}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        authListen: state.user.authListen,
        authDone: state.user.authDone,
        todos: state.todo.todos
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTodos: () => dispatch(fetchTodos()),
        onWriteTodo: (text) => dispatch(writeTodos(text)),
        onDeleteTodo: (id) => dispatch(deleteTodo(id)),
        onPatchTodo: (id, completed) => dispatch(patchTodo(id, completed))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);