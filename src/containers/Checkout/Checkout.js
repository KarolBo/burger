import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueddHandler = () => {
    this.props.history.replace('/contact-data');
  }

  render () {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of params.entries()) {
      ingredients[param[0]] = +param[1];
    }

    return (
      <div>
        <CheckoutSummary 
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueddHandler} />
      </div>
    );
  }
}

export default Checkout;