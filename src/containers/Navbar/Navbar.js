import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/index';

import ProfileSettings from '../../components/ProfileSettings/ProfileSettings';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TodoLogo from '../../assets/todo-logo.png';
import ProfileIcon from '../../assets/man-icon.png';

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
    position: relative;
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

const NavProfileIcon = styled.img`
    height: 3.5rem;
    width: 3.5rem;
    margin-right: 2rem;
    cursor: pointer;
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
            localPass: '',
            showSettings: false
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

    triggerSettings = () => {
        this.setState(prevState => ({ showSettings: !prevState.showSettings }));
    }

    clearLocalLoginState = () => {
        this.setState({ localEmail: '', localPass: '' });
    }

    login = async () => {
        await this.props.onLogin(this.state.localEmail, this.state.localPass);
        this.props.clearLocalLoginState();
        if (this.props.uid) this.props.history.push('/todo');
        window.location.reload(false);
    }

    logout = async () => {
        await this.props.onLogout();
        window.location.reload(false);
    }

    render () {
        let navContent;
        if (this.props.uid && !this.props.authListen && this.props.authDone) {
            navContent = (
                <NavWrapper>
                    <NavLeft>
                        <NavLeftLogo src={TodoLogo} alt="todo-logo" />
                        <NavLeftAppName> DMC - Todo App </NavLeftAppName>
                    </NavLeft>
                    <NavRight>
                        <NavProfileIcon onClick={this.triggerSettings} src={ProfileIcon} alt="man-icon" />
                        {this.state.showSettings ? <ProfileSettings username={this.props.username} email={this.props.email} clicked={this.logout} /> : null}
                    </NavRight>
                </NavWrapper>
            );
        } else if (!this.props.uid && !this.props.authListen && this.props.authDone) {
            navContent = (
                <NavWrapper>
                    <NavLeft>
                        <NavLeftLogo src={TodoLogo} alt="todo-logo" />
                        <NavLeftAppName> DMC - Todo App </NavLeftAppName>
                    </NavLeft>
                    <NavRight>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.login();
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
        } else 
            navContent = null;

        return navContent;
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        username: state.user.username,
        email: state.user.email,
        authListen: state.user.authListen,
        authDone: state.user.authDone
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(login(email, password)),
        onLogout: () => dispatch(logout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));