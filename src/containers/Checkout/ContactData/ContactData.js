import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-orders';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
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
    }
  });

  const [formValid, setFormValid] = useState(false);

  const checkValidity = (value, rules) => {
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

  const orderHandler = (event) => {
    event.preventDefault();
    const orderData = {};
    for (let key in orderForm)
      orderData[key] = orderForm[key].value;
    const order = {
        ingredients: props.ingredients,
        price: props.totalPrice,
        formData: orderData,
        userId: props.userId
    };
    
    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...orderForm};
    const updatedInput = {...updatedOrderForm[inputId]};

    updatedInput.value = event.target.value;
    updatedInput.valid = checkValidity(updatedInput.value, updatedInput.validation);
    updatedOrderForm[inputId] = updatedInput;
    updatedOrderForm[inputId].touched = true;

    let formValid = true;
    for (let formKey in orderForm) {
      formValid = formValid && orderForm[formKey].valid;
    }

    setOrderForm(updatedOrderForm);
    setFormValid(formValid);
  }

  let form = (
    <form onSubmit={orderHandler} >
        {Object.keys(orderForm).map( my_input => <Input elementType={orderForm[my_input].elementType} 
                                                                    elementConfig={orderForm[my_input].elementConfig} 
                                                                    value={orderForm[my_input].value} 
                                                                    changed={(event) => inputChangedHandler(event, my_input)}
                                                                    invalid={!orderForm[my_input].valid}
                                                                    shouldValidate={!!orderForm[my_input].validation}
                                                                    touched={orderForm[my_input].touched}
                                                                    key={my_input} /> )}
        <Button disabled={!formValid} btnType='Success'>ORDER</Button>
      </form>
  );
  if (props.loading)
    form = <Spinner />

  return(
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));