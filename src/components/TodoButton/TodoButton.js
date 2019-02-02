import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

import TextArea from '../../components/TextArea/TextArea';

const IconTransition = styled.i`
    transition: opacity 500ms ease-in-out;
    opacity: ${props => props.opacity};
`

const TodoElement = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 30%;
    margin: 0 1.5rem;
    background-color: transparent;
    color: #fff;
`

const todoButton = ({ show, value, clicked, submitted, changed }) => {
    return (<TodoElement>
        <Transition in={show} timeout={250} mountOnEnter unmountOnExit>
            {state => (
                <IconTransition style={{color: '#363636', fontSize: '100px', margin: '0 auto', cursor: 'pointer'}} 
                                opacity={state === 'entered' || state === 'exited' ? 1 : 0}
                                className="material-icons" onClick={clicked}> 
                    remove_circle 
                </IconTransition>
            )}
         </Transition>
         <Transition in={!show} timeout={250} mountOnEnter unmountOnExit>
            {state => (
                <IconTransition style={{color: '#355C7D', fontSize: '100px', margin: '0 auto', cursor: 'pointer'}} 
                                opacity={state === 'entered' || state === 'exited' ? 1 : 0}
                                className="material-icons" onClick={clicked}> 
                    add_circle 
                </IconTransition>
            )}
         </Transition>
         <TextArea show={show} submitted={(event) => submitted(event)} 
                        value={value} changed={changed} />
    </TodoElement>)
};

export default todoButton;