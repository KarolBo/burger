import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  const { authCheckState } = props;

  useEffect(authCheckState, [authCheckState]);

  let routes;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path='/orders' exact component={asyncOrders} />
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/auth' exact component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/auth' exact component={asyncAuth} />
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