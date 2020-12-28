import React, { Component } from 'react';

import MyAux from '../../hoc/MyAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

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
        totalPrice: 0
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
    } 

    render() {
        let disabledControls = {};
        for (let key in this.state.ingredients)
            disabledControls[key] = this.state.ingredients[key] <= 0;

        return (
            <MyAux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addHandler={this.addIngredientHandler}
                               removeHandler={this.removeIngredientHandler}
                               disabledControls={disabledControls}/>
            </MyAux> )
    }
}

export default BurgerBuilder;