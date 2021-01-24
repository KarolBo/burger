import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            client: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            price: this.props.totalPrice
        };
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                loading: false
            });
        });
  }

  render(){
    let form = (
      <form action="">
          {Object.keys(this.state.orderForm).map( my_input => <Input elementType={this.state.orderForm[my_input].elementType} 
                                                                     elementConfig={this.state.orderForm[my_input].elementConfig} 
                                                                     value={this.state.orderForm[my_input].value} 
                                                                     changed={()=>{}}
                                                                     key={my_input} /> )}
          <Button onClick={this.orderHandler}
                  btnType='Success'>ORDER</Button>
        </form>
    );
    if (this.state.loading)
      form = <Spinner />


    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
export default withRouter(ContactData);