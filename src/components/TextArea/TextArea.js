import React from 'react';
import styled from 'styled-components';

const TextForm = styled.form`
    display: ${props => props.show ? 'block' : 'none'};
    position: relative;
`

const TextWrapper = styled.textarea`
    resize: none;
    height: 10rem;
    width: 100%;
    background-color: #363636;
    border-radius: 10px;
    outline: none;
    color: #fff;
    margin-top: 2rem;
    padding: 0.5rem;
    ::placeholder {
        color: #fff;
    }
`   

const textArea = props => {
    return (
        <TextForm onSubmit={props.submitted} show={props.show}>
            <TextWrapper placeholder="Create a todo." minlength="1" maxLength="100" spellCheck={true} value={props.value} onChange={props.changed} />
            <i style={{color: '#fff', position: 'absolute', bottom: '10%', right: '1%', cursor: 'pointer'}} 
                className="medium material-icons" onClick={props.submitted}>border_color</i>
        </TextForm>
    );
};

export default textArea;