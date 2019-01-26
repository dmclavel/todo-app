import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    font-family: 'Lora', serif;
    border-radius: 10px;
    border-style: none;
    height: ${props => props.style.height};
    width: ${props => props.style.width};
    margin: ${props => props.style.margin};
    cursor: pointer;
    outline: none;
`

const button = (props) => {
    return (
        <ButtonWrapper style={props.style}>
            {props.buttonName}
        </ButtonWrapper>
    );
};

export default button;