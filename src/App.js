import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authListen } from './store/actions/index';

import Navbar from './containers/Navbar/Navbar';
import Footer from './containers/Footer/Footer';
import Home from './containers/Home/Home';
import Todo from './containers/Todo/Todo';

class App extends Component {
  componentDidMount () {
    this.props.onAuthListen();
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/todo" exact component={Todo} />
        </Switch>
        <Footer />
      </Fragment>  
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthListen: () => dispatch(authListen())
  }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
