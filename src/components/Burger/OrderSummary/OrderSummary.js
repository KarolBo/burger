import React from 'react';
import MyAux from '../../../hoc/MyAux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map( key => {
        return (
            <li key={key}>
                <span style={{textTrensform: 'capitalize'}}>{key}</span> {props.ingredients[key]}
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
            <p><strong>Total Price: {props.price} $</strong></p>
            <p>Proceed the order?</p>
            <Button btnType='Success' onClick={props.continuing}>CONTINUE</Button>
            <Button btnType='Danger' onClick={props.closing}>CANCEL</Button>
        </MyAux>
    );
};

export default orderSummary;