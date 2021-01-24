import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: 0
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueddHandler = () => {
    this.props.history.replace(this.props.match.path + '/contact-data');
  }

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of params.entries()) {
      if (param[0]==='price')
        price = +param[1]
      else
        ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients,
      price
    })
  }

  render () {

    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueddHandler} />
        <Route path={this.props.match.path + '/contact-data'} 
               render={() => (<ContactData 
                                  ingredients={this.state.ingredients} 
                                  totalPrice={this.state.price}/>)} />
      </div>
    );
  }
}

export default Checkout;