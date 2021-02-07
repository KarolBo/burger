import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-orders';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
        touched: false
      },
    },
    formValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    value = value.trim();

    if (!rules) return true;

    if (rules.required)
      isValid = (isValid && !!value);

    if (rules.minLength)
      isValid = (isValid && value.length >= rules.minLength);

    if (rules.maxLength)
      isValid = (isValid && value.length <= rules.maxLength);

      return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    const orderData = {};
    for (let key in this.state.orderForm)
      orderData[key] = this.state.orderForm[key].value;
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        formData: orderData
    };
    
    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedInput = {...updatedOrderForm[inputId]};

    updatedInput.value = event.target.value;
    updatedInput.valid = this.checkValidity(updatedInput.value, updatedInput.validation);
    updatedOrderForm[inputId] = updatedInput;
    updatedOrderForm[inputId].touched = true;

    let formValid = true;
    for (let formKey in this.state.orderForm) {
      formValid = formValid && this.state.orderForm[formKey].valid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formValid
    });
  }

  render(){
    let form = (
      <form onSubmit={this.orderHandler} >
          {Object.keys(this.state.orderForm).map( my_input => <Input elementType={this.state.orderForm[my_input].elementType} 
                                                                     elementConfig={this.state.orderForm[my_input].elementConfig} 
                                                                     value={this.state.orderForm[my_input].value} 
                                                                     changed={(event) => this.inputChangedHandler(event, my_input)}
                                                                     invalid={!this.state.orderForm[my_input].valid}
                                                                     shouldValidate={!!this.state.orderForm[my_input].validation}
                                                                     touched={this.state.orderForm[my_input].touched}
                                                                     key={my_input} /> )}
          <Button disabled={!this.state.formValid} btnType='Success'>ORDER</Button>
        </form>
    );
    if (this.props.loading)
      form = <Spinner />
  
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));