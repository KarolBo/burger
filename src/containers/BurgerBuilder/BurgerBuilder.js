import React, { Component } from 'react';

import MyAux from '../../hoc/MyAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    meat: 1, 
    bacon: 0.4, 
    cheese: 0.5, 
    salad: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0,
            cheese: 0, 
            meat: 0
        }, 
        totalPrice: 4, //bread
        purchasable: false
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] += 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
        });

        this.updatePurchasable(updatedIngredients);
    } 

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (updatedIngredients[type] <= 0)
            return;

        updatedIngredients[type] -= 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
        });

        this.updatePurchasable(updatedIngredients);
    } 

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce( (acc, cur) => acc + cur, 0);
        this.setState( {
            purchasable: !!sum
        });
    }

    render() {
        let disabledControls = {};
        for (let key in this.state.ingredients)
            disabledControls[key] = this.state.ingredients[key] <= 0;

        return (
            <MyAux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addHandler={this.addIngredientHandler}
                               removeHandler={this.removeIngredientHandler}
                               disabledControls={disabledControls}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable} />
            </MyAux> )
    }
}

export default BurgerBuilder;