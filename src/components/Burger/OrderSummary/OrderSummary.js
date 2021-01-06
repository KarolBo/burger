import React, { Component } from 'react';
import MyAux from '../../../hoc/MyAux/MyAux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary] did update');
    };

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map( key => {
            return (
                <li key={key}>
                    <span style={{textTrensform: 'capitalize'}}>{key}</span> {this.props.ingredients[key]}
                </li>
            );
        });
    
        return (
            <MyAux>
                <h3>Order Summary</h3>
                <p>Your delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price} $</strong></p>
                <p>Proceed the order?</p>
                <Button btnType='Success' onClick={this.props.continuing}>CONTINUE</Button>
                <Button btnType='Danger' onClick={this.props.closing}>CANCEL</Button>
            </MyAux>
        );
    }
};

export default OrderSummary;