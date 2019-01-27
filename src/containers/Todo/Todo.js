import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchTodos ,writeTodos, deleteTodo, patchTodo } from '../../store/actions/index';

import TextArea from '../../components/TextArea/TextArea';
import Input from '../../components/Input/Input';

const TodoWrapper = styled.div`
    display: flex;
    width: 90%;
    height: 30rem;
    position: absolute;
    z-index: -1;
    left: 5.5%;
    top: 20%;
`

const TodoElementSeparate = styled.div`
    display: block;
    align-items: feComponentTransfer;
    position: relative;
    overflow: auto;
    width: 30%;
    margin: 0 1rem;
    background-color: #363636;
    color: #fff;
    ::-webkit-scrollbar-track {
        border: 1px solid #ffc153;
        border-radius: 10px;
        background-color: #355C7D;
    }
    ::-webkit-scrollbar {
        width: 0.3rem;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #355C7D;
    }
`

const TodoLabel = styled.h3`
    font-family: 'Special Elite', cursive;
    color: #fff;
    letter-spacing: 0.2rem;
    text-align: center;
`

const TodoElement = styled.div`
    display: inline-flex;
    width: 30%;
    margin: 0 1.5rem;
    background-color: #363636;
    color: #fff;
`

const TodoIndv = styled.div`
    display: inline-flex;
    width: 90%;
    height: 3rem;
    background-color: #83AE98;
    border-radius: 10px;
    align-items: center;
    margin: 0.8rem 1.2rem;
    word-break: break-all;
    overflow: auto;
    position: relative;
    ::-webkit-scrollbar-track {
        border: 2px solid #ffc153;
        background-color: #355C7D;
    }
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #355C7D;
    }
`

const HelperIcon = styled.i`
    position: absolute;
    right: ${props => props.right};
    cursor: pointer;
    :hover {
        color: #355C7D;
    }
`

const inputInlineStyle = {
    fontSize: '1rem',
    padding: '0 0.60rem',
    width: '10%',
    height: '1rem',
    borderRadius: '10px'
}

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
        let todoRedirect, todoContent, taskList, completedList;
        if (!this.props.uid && !this.props.authListen && this.props.authDone) {
            todoRedirect = <Redirect to="/" />;
        } else if (this.props.uid && !this.props.authListen && this.props.authDone) {
            taskList = this.props.todos.map(todo => {
                return !todo.completed ? (
                    <TodoIndv key={todo._id}>
                        <Input type="checkbox" name="todo" style={inputInlineStyle} value="todo_val" changed={() => this.props.onPatchTodo(todo._id, todo.completed)} />
                        <label htmlFor="todo_val" style={{padding: '0.5rem'}}> {todo.text} </label>
                        <HelperIcon right="1rem" className="material-icons" onClick={() => this.props.onDeleteTodo(todo._id)}> delete </HelperIcon>
                        <HelperIcon right="3rem" className="material-icons"> edit </HelperIcon>
                    </TodoIndv>
                ) : null;
            });
            completedList = this.props.todos.map(todo => {
                return todo.completed ? (
                    <TodoIndv key={todo._id}>
                        <Input type="checkbox" name="todo" style={inputInlineStyle} value="todo_val" changed={() => this.props.onPatchTodo(todo._id, todo.completed)} checked={todo.completed} />
                        <label htmlFor="todo_val" style={{padding: '0.5rem'}}> {todo.text} </label>
                        <HelperIcon right="1rem" className="material-icons" onClick={() => this.props.onDeleteTodo(todo._id)}> delete </HelperIcon>
                        <HelperIcon right="3rem" className="material-icons"> edit </HelperIcon>
                    </TodoIndv>
                ) : null;
            });
            todoContent = (
                <TodoWrapper>
                    <TodoElementSeparate> 
                        <TodoLabel> Tasks to Complete </TodoLabel>
                        {taskList} 
                    </TodoElementSeparate>
                    <TodoElementSeparate style={{backgroundColor: '#355C7D'}}> 
                        <TodoLabel> Completed Todos </TodoLabel>
                        {completedList}
                    </TodoElementSeparate>
                    <TodoElement style={{backgroundColor: 'transparent', flexDirection: 'column'}}>
                        { this.state.addTodo ?
                            <i style={{color: '#363636', fontSize: '100px', margin: '0 auto', cursor: 'pointer'}} 
                            className="material-icons" onClick={this.triggerAddTodo}>remove_circle</i>
                            :
                            <i style={{color: '#355C7D', fontSize: '100px', margin: '0 auto', cursor: 'pointer'}} 
                            className="material-icons" onClick={this.triggerAddTodo}>add_circle</i>
                        }
                        <TextArea show={this.state.addTodo} submitted={(event) => {
                            event.preventDefault();
                            this.clearLocalState();
                            this.props.onWriteTodo(this.state.todo);
                        }} 
                            value={this.state.todo} changed={this.todoChange} />
                    </TodoElement>
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