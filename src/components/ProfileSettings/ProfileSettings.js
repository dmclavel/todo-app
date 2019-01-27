import React from 'react';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15rem;
    height: 10rem;
    background-color: #355C7D;
    border-radius: 15px;
    position: absolute;
    right: 2rem;
    top: 140%;
    overflow: auto;
    z-index: 100;
`

const SettingsElement = styled.span`
    font-family: 'Special Elite', cursive;
    font-size: 1.2rem;
    margin: 0.75rem;
    text-align: center;
    color: #fff;
`

const SettingsElementUnique = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Special Elite', cursive;
    font-size: 1.2rem;
    margin: 0.75rem;
    text-align: center;
    color: #fff;
    width: 6rem;
    height: 2rem;
    cursor: pointer;
    :hover {
        background: #fff;
        color: #355C7D;
        border-radius: 10px;
    }
`

const profileSettings = (props) => {
    return (
        <SettingsWrapper>
            <SettingsElement> {props.username} </SettingsElement>
            <SettingsElement> {props.email} </SettingsElement>
            <SettingsElementUnique onClick={props.clicked}> Logout </SettingsElementUnique>
        </SettingsWrapper>
    );
};

export default profileSettings;