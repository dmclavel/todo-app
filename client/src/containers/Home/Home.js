import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signup } from '../../store/actions/index';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const HomeWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`

const inputInlineStyle = {
    padding: '0 0.75rem',
    margin: '1.5rem 0'
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localEmail: '',
            localPass: ''
        };
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
    };

    emailChanged(e) {
        this.setState({ localEmail: e.target.value });
    }

    passwordChanged(e) {
        this.setState({ localPass: e.target.value });
    }

    render () {
        let homeContent;
        if (this.props.uid) {
            homeContent = <HomeWrapper> AUTHENTICATED </HomeWrapper>
        } else {
            homeContent = (
                <HomeWrapper onSubmit={(event) => {
                        event.preventDefault();
                        this.props.onSignup(this.state.localEmail, this.state.localPass);
                    }}>
                        <Input type="email" placeholder="E-mail address" value={this.state.localEmail} changed={this.emailChanged} style={inputInlineStyle} />
                        <Input type="password" placeholder="Password" value={this.state.localPass} changed={this.passwordChanged} style={inputInlineStyle} />
                        <Button buttonName="Sign up" />
                </HomeWrapper>
            );
        }
        
        return homeContent;
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
        onSignup: (email, password) => dispatch(signup(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);