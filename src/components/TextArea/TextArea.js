import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const TextForm = styled.form`
    position: relative;
    height: 100%;
    animation: ${props => props.animation};
    @keyframes onEntered {
        0% {
            opacity: 0;
            transform: translateY(-30vh);
        }
        50% {
            opacity: 1;
            transform: translateY(-15vh);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes onExited {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
            transform: translateY(-15vh);
        }
        100% {
            opacity: 0;
            transform: translateY(-30vh);
        }
    }
`

const TextWrapper = styled.textarea`
    resize: none;
    height: 50%;
    width: 100%;
    background-color: #363636;
    font-size: 1.5rem;
    border-radius: 10px;
    outline: none;
    color: #fff;
    margin-top: 2rem;
    padding: 1rem;
    ::placeholder {
        color: #fff;
        font-size: 1.3rem;
    }
`   

const TextAreaIcon = styled.i`
    font-size: 2rem;
    color: #fff;
    position: absolute;
    top: 52%;
    right: 0;
    cursor: pointer;
    :hover {
        color: #355C7D;
    }
`

const textArea = props => {
    return (
        <Transition in={props.show} timeout={250} mountOnEnter unmountOnExit>
            {state => (
                <TextForm onSubmit={props.submitted} animation={state === 'entered' || state === 'entering' ? 'onEntered 250ms ease-out forwards' : 'onExited 250ms ease-out forwards'}>
                    <TextWrapper placeholder="Create a todo." minlength="1" maxLength="100" spellCheck={true} value={props.value} onChange={props.changed} />
                    <TextAreaIcon className="material-icons" onClick={props.submitted}>
                        border_color
                    </TextAreaIcon>
                </TextForm>
            )}
        </Transition>
    );
};

export default textArea;