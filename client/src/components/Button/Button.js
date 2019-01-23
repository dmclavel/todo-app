import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    margin: 0 1.5rem 0 0.5rem;
`

const button = (props) => {
    return (
        <ButtonWrapper>
            {props.buttonName}
        </ButtonWrapper>
    );
};

export default button;