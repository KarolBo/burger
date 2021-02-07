import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    let routes;
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/orders' exact component={Orders} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/auth' exact component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }


    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
};

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));