import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';

import Input from '../../components/Input/Input';

const IndvTransition = styled.div`
    transition: opacity 500ms ease-in-out;
    opacity: ${props => props.opacity};
`

const List = ({ className, children }) => (
    <TransitionGroup className={className}>
        {children}
    </TransitionGroup>
);

const Element = (props) => (
    <Transition in={props.in} timeout={500} mountOnEnter unmountOnExit>
        {(state) => (
            <IndvTransition className={props.className} opacity={state === 'entered' || state === 'exited' ? 1 : 0}>
                {props.children}
            </IndvTransition>
        )}
    </Transition>
);

const StyledList = styled(List)`
    display: block;
    align-items: center;
    position: relative;
    overflow: auto;
    width: 30%;
    margin: 0 1rem;
    background-color: ${props => props.bgColor};
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

const StyledElement = styled(Element)`
    display: inline-flex;
    width: 92%;
    height: 3rem;
    background-color: ${props => props.bgColor};
    align-items: center;
    justify-items: center;
    margin: 0.8rem 1.2rem;
    word-break: break-all;
    overflow: auto;
    position: relative;
    ::-webkit-scrollbar-track {
        border: 1px solid #ffc153;
        background-color: #355C7D;
    }
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ffc153;
    }
`

const TodoLabel = styled.h3`
    font-family: 'Special Elite', cursive;
    color: ${props => props.color};
    letter-spacing: 0.2rem;
    text-align: center;
    position: absolute;
    bottom: 100%;
    left: ${props => props.left};
    z-index: 10;
`

const CheckBoxLabel = styled.label`
    display: inherit;
    width: 60%;
    height: 3rem;
    align-items: center;
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

const todoList = props => {
    const todoListContent = props.todos !== undefined ? props.todos.map(todo => {
        return !todo.completed ? (
            <StyledElement bgColor="#83AE98" key={todo._id}>
                <Input type="checkbox" id="todo_val" style={inputInlineStyle} value="todo_val" changed={() => props.patched(todo._id, todo.completed)} />
                <CheckBoxLabel htmlFor="todo_val"> {todo.text} </CheckBoxLabel>
                <HelperIcon right="1rem" className="material-icons" onClick={() => props.deleted(todo._id)}> delete </HelperIcon>
                <HelperIcon right="3rem" className="material-icons"> edit </HelperIcon>
            </StyledElement>
        ) : null;
    }) : null;

    const completedList = props.todos !== undefined ? props.todos.map(todo => {
        return todo.completed ? (
            <StyledElement bgColor="#F0B7A4" key={todo._id}>
                <Input type="checkbox" id="todo_val" style={inputInlineStyle} value="todo_val" changed={() => props.patched(todo._id, todo.completed)} checked />
                <CheckBoxLabel style={{textDecoration: 'line-through'}} htmlFor="todo_val"> {todo.text} </CheckBoxLabel>
                <HelperIcon right="1rem" className="material-icons" onClick={() => props.deleted(todo._id)}> delete </HelperIcon>
                <HelperIcon right="3rem" className="material-icons"> edit </HelperIcon>
            </StyledElement>
        ) : null;
    }) : null;

    return (
        <Fragment>
            <TodoLabel left="10%" color="#363636"> Tasks to Complete </TodoLabel>
            <TodoLabel left="42%" color="#355C7D"> Completed Tasks </TodoLabel>
            <StyledList bgColor="#363636">
                {todoListContent}
            </StyledList>
            <StyledList bgColor="#355C7D">
                {completedList}
            </StyledList>
        </Fragment>
    );
};

export default todoList;