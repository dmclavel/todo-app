import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authListen } from './store/actions/index';

import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';

class App extends Component {
  componentDidMount () {
    this.props.onAuthListen();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>  
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthListen: () => dispatch(authListen())
  }
};

export default connect(null, mapDispatchToProps)(App);
