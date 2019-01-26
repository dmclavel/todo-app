import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/index';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TodoLogo from '../../assets/todo-logo.png';

const NavWrapper = styled.nav`
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    background-color: #363636;
    height: 4.5rem;
    width: 90%;
    position: fixed;
    top: 5%;
    left: 5%;
    border-radius: 25px;
`
const NavLeft = styled.div`
    display: inline-flex;
    align-items: center;
    width: 20%;
`

const NavLeftLogo = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    margin-left: 4rem;
`

const NavLeftAppName = styled.span`
    font-family: 'Special Elite', cursive;
    font-size: 1.3rem;
    margin-left: 1rem;
    color: #fff;
`

const NavRight = styled.div`
    display: inline-flex;
    justify-content: flex-end;
    width: 80%;
`

const NavRightElement = styled.div`
    display: inline-flex;
    width: 200px;
    flex-direction: column;
    justify-content: space-around;
    height: 3rem;
    margin: 0 0.5rem;
`

const inputInlineStyle = {
    fontSize: '0.75rem',
    padding: '0 0.60rem',
    width: '90%',
    height: '1.2rem',
    borderRadius: '10px'
}

const buttonInlineStyle = {
    width: '50%',
    height: '1.2rem',
    margin: '0 1.5rem 0 0.5rem'
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localEmail: '',
            localPass: ''
        };
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
    }

    emailChanged(e) {
        this.setState({ localEmail: e.target.value });
    }

    passwordChanged(e) {
        this.setState({ localPass: e.target.value });
    }

    render () {
        let navContent;
        if (this.props.uid) {
            navContent = (
                <NavWrapper>
                    <NavRight>
                        <span>{this.props.email}</span>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.props.onLogout();
                        }}>
                            <Button buttonName="Log out" style={buttonInlineStyle} />
                        </form>
                    </NavRight>
                </NavWrapper>
            );
        } else {
            navContent = (
                <NavWrapper>
                    <NavLeft>
                        <NavLeftLogo src={TodoLogo} alt="todo-logo" />
                        <NavLeftAppName> DMC - Todo App </NavLeftAppName>
                    </NavLeft>
                    <NavRight>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.props.onLogin(this.state.localEmail, this.state.localPass);
                        }}>
                            <NavRightElement>
                                <span style={{color: '#fff', padding: '0 0.2rem'}}> E-mail </span>
                                <Input type="email" value={this.state.localEmail} changed={this.emailChanged} style={inputInlineStyle} />
                            </NavRightElement>
                            <NavRightElement>
                                <span style={{color: '#fff', padding: '0 0.2rem'}}> Password </span>
                                <Input type="password" value={this.state.localPass} changed={this.passwordChanged} style={inputInlineStyle} />
                            </NavRightElement>
                            <NavRightElement>
                                <span style={{opacity: '0'}}> trick </span>
                                <Button buttonName="Log in" style={buttonInlineStyle} />
                            </NavRightElement>
                        </form>
                    </NavRight>
                </NavWrapper>
            );
        }

        return navContent;
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        email: state.user.email
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(login(email, password)),
        onLogout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);