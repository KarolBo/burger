import React from 'react';
import MyAux from '../../../hoc/MyAux';

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
            <p>Proceed the order?</p>
        </MyAux>
    );
};

export default orderSummary;