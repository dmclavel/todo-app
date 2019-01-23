import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/index';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const NavWrapper = styled.nav`
        display: flex;
        background-color: lightblue;
    `
    const NavLeft = styled.div`
        display: inline-flex;
        width: 50%;
    `
    const NavRight = styled.div`
        display: inline-flex;
        justify-content: flex-end;
        width: 50%;
    `

    const inputInlineStyle = {
        padding: '0 0.75rem',
        margin: '0 0.5rem'
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
                            <Button buttonName="Log out" />
                        </form>
                    </NavRight>
                </NavWrapper>
            );
        } else {
            navContent = (
                <NavWrapper>
                    <NavLeft>
                        Left
                    </NavLeft>
                    <NavRight>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.props.onLogin(this.state.localEmail, this.state.localPass);
                        }}>
                            <Input type="email" placeholder="E-mail address" value={this.state.localEmail} changed={this.emailChanged} style={inputInlineStyle} />
                            <Input type="password" placeholder="Password" value={this.state.localPass} changed={this.passwordChanged} style={inputInlineStyle} />
                            <Button buttonName="Log in" />
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