import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends React.Component {
  state = {
    name: '',
    address: {
      street: '',
      postCode: ''
    },
    email: '',

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
          <input className={classes.Input} type="text" name="name" placeholder='Your Name'/>
          <input className={classes.Input} type="text" name="email" placeholder='Your Email'/>
          <input className={classes.Input} type="text" name="street" placeholder='Your Street'/>
          <input className={classes.Input} type="text" name="postCode" placeholder='Your Postcode'/>
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