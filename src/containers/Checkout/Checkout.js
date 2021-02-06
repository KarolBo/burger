import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueddHandler = () => {
    this.props.history.replace(this.props.match.path + '/contact-data');
  }

  render () {
    const redirect_home = this.props.purchased ? <Redirect to='/' /> : null;
    let summary = <div>
                    {redirect_home}
                    <CheckoutSummary 
                      ingredients={this.props.ingredients}
                      checkoutCancelled={this.checkoutCancelledHandler}
                      checkoutContinued={this.checkoutContinueddHandler} />
                    <Route path={this.props.match.path + '/contact-data'} >
                      <ContactData/>
                    </Route>
                  </div>
    if (!this.props.ingredients) {
      summary = <Redirect to='/' />;
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);