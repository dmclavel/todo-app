import React, { Component } from 'react';
import styled from 'styled-components';

import GithubImg from '../../assets/github.png';
import TwitterImg from '../../assets/twitter.png';
import EmailImg from '../../assets/email.png';

const FooterWrapper = styled.div`
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    height: 12rem;
    width: 90%;
    position: absolute;
    top: 89%;
    left: 5%;
    border-radius: 25px;
`

const FooterLeft = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 40%;
    align-items: center;
    position: absolute;
    top: 5%;
    right: 50%;
`

const LeftContainer = styled.div`
    display: inline-flex;
    align-items: center;
    width: 100%;
`

const ProductIcon = styled.img`
    width: 3rem;
    height: 3rem;
`

const Link = styled.a`
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    margin: 0 0.5rem;
    :hover {
        border-bottom: 2px solid #fff;
    }
`

class Footer extends Component {
    render () {
        return (
            <FooterWrapper>
                <FooterLeft>
                    <LeftContainer>
                        <ProductIcon src={GithubImg} alt="git-icon" />
                        <Link href="https://github.com/dmclavel/todo-app" target="no_blank"> Official Github Repository </Link>
                    </LeftContainer>
                    <LeftContainer style={{marginTop: '20px'}}>
                        <ProductIcon src={TwitterImg} alt="twitter-icon" />
                        <Link href="https://github.com/dmclavel/todo-app" target="no_blank"> Todo App Twitter Page </Link>
                    </LeftContainer>
                    <LeftContainer style={{marginTop: '20px'}}>
                        <ProductIcon src={EmailImg} alt="email-icon" />
                        <Link href="mailto: dmclavel@up.edu.ph?Subject=User Feedback"> Send a feedback </Link>
                    </LeftContainer>
                </FooterLeft>
            </FooterWrapper>
        );
    }
}

export default Footer;