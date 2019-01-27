import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
    font-family: 'Lora', serif;
    border-style: none;
    outline: none;
    font-size: ${props => props.style.fontSize};
    color: ${props => props.style.color};
    width: ${props => props.style.width};
    height: ${props => props.style.height};
    padding: ${props => props.style.padding};
    margin: ${props => props.style.margin};
    background: ${props => props.style.background};
    border-bottom: ${props => props.style.borderBottom};
    border-radius: ${props => props.style.borderRadius};
    ::placeholder {
        color: #fff;
    }
`

const input = (props) => {
    return (
        <InputWrapper placeholder={props.placeholder} value={props.value} 
            onChange={props.changed} style={props.style} type={props.type} 
            name={props.name} checked={props.checked} />
    );
};

export default input;