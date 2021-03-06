import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../store/actions/index';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import HomeImage from '../../assets/home-image.jpg';

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgDarker = styled.div`
    position: fixed;
    z-index: -1;
    background-color: #000;
    overflow: initial;
    width: 100%;
    height: 100%;
`

const SignupWrapper = styled.form`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 15%;
    top: 30%;
`

const HomeImg = styled.img `
    width: 100%;
    height: 100%;
    opacity: 0.4;
`

const SpanWrapper = styled.span`
    font-family: 'Fredoka One', cursive;
    font-size: 1.6rem;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2rem;
`

const inputInlineStyle = {
    fontSize: '1.25rem',
    padding: '0 0.5rem',
    margin: '1.5rem 0',
    width: '400px',
    height: '3rem',
    color: '#fff',
    background: 'transparent',
    borderBottom: '2px solid #fff',
    borderRadius: '0'
}

const buttonInlineStyle = {
    width: '40%',
    height: '2rem',
    margin: '0 0 0 0.25rem'
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localUsername: '',
            localEmail: '',
            localPass: ''
        };
        this.usernameChanged = this.usernameChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
    };

    usernameChanged(e) {
        this.setState({ localUsername: e.target.value });
    }

    emailChanged(e) {
        this.setState({ localEmail: e.target.value });
    }

    passwordChanged(e) {
        this.setState({ localPass: e.target.value });
    }

    clearLocalSignupState = () => {
        this.setState({ localUsername: '', localEmail: '', localPass: '' });
    }

    signup = () => {
        this.clearLocalSignupState();
        this.props.onSignup(this.state.localUsername, this.state.localEmail, this.state.localPass);
    }

    render () {
        let homeRedirect = null;
        if (this.props.uid && !this.props.authListen && this.props.authDone)
            homeRedirect = <Redirect to="/todo" />;

        return (
            <HomeWrapper>
                {homeRedirect}
                <ImgDarker>
                    <HomeImg src={HomeImage} alt="home-image" />
                </ImgDarker>
                <SignupWrapper onSubmit={(event) => {
                        event.preventDefault();
                        this.signup();
                    }}>
                    <SpanWrapper> REGISTER AN ACCOUNT! </SpanWrapper>
                    <Input type="text" placeholder="Username" value={this.state.localUsername} changed={this.usernameChanged} style={inputInlineStyle} />
                    <Input type="email" placeholder="E-mail" value={this.state.localEmail} changed={this.emailChanged} style={inputInlineStyle} />
                    <Input type="password" placeholder="Password" value={this.state.localPass} changed={this.passwordChanged} style={inputInlineStyle} />
                    <Button buttonName="Sign up" style={buttonInlineStyle} />
                </SignupWrapper>
            </HomeWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        authListen: state.user.authListen,
        authDone: state.user.authDone
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (username, email, password) => dispatch(signup(username, email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);