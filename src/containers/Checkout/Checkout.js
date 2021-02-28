import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.push(props.match.path + '/contact-data');
  }

  const redirect_home = props.purchased ? <Redirect to='/' /> : null;
  let summary = <div>
                  {redirect_home}
                  <CheckoutSummary 
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                  <Route path={props.match.path + '/contact-data'} >
                    <ContactData/>
                  </Route>
                </div>
  if (!props.ingredients) {
    summary = <Redirect to='/' />;
  }
  return summary;
}

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);