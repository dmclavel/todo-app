import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
    padding: ${props => props.style.padding};
    margin: ${props => props.style.margin};
`

const input = (props) => {
    return (
        <InputWrapper placeholder={props.placeholder} value={props.value} 
            onChange={props.changed} style={props.style} type={props.type} />
    );
};

export default input;