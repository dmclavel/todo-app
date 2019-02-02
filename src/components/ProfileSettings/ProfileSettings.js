import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

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
    animation: ${props => props.animation};
    @keyframes onEnteredProfile {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes onExitedProfile {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0.75;
        }
        50% {
            opacity: 0.5;
        }
        75% {
            opacity: 0.25;
        }
        100% {
            opacity: 0;
        }
    }
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
        <Transition in={props.show} timeout={500} mountOnEnter unmountOnExit>
            {state => (
                <SettingsWrapper animation={state === 'entered' || state === 'entering' ? 'onEnteredProfile 500ms ease-out forwards' : 'onExitedProfile 500ms ease-in forwards'}>
                    <SettingsElement> {props.username} </SettingsElement>
                    <SettingsElement> {props.email} </SettingsElement>
                    <SettingsElementUnique onClick={props.clicked}> Logout </SettingsElementUnique>
                </SettingsWrapper>
            )}
        </Transition>  
    );
};

export default profileSettings;