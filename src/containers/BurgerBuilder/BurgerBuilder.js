import React, { Component } from 'react';

import MyAux from '../../hoc/MyAux/MyAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        current_prices: null,
        ingredients: null, 
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            client: {
                name: 'Karol',
                address: {
                    city: 'Adliswil',
                    street: 'Ruetistrasse',
                    nummer: 28,
                    apartment: 4
                },
                phone: '0762453801',
            },
            price: this.state.totalPrice
        };
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({
                loading: false,
                purchasing: false
            });
        })
        .catch(err => {
            this.setState({
                loading: false
            });
        });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] += 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + this.state.current_prices[type]
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
            totalPrice: this.state.totalPrice - this.state.current_prices[type]
        });

        this.updatePurchasable(updatedIngredients);
    } 

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce( (acc, cur) => acc + cur, 0);
        this.setState( {
            purchasable: !!sum
        });
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            const ing = response.data;
            let ingredients = {}, prices = {};
            Object.keys(ing).forEach(ingKey => {
                if (ingKey !== 'bread') {
                    ingredients[ingKey] = 0;
                    prices[ingKey] = ing[ingKey];
                }
            });

            this.setState({
                ingredients,
                current_prices: prices,
                totalPrice: ing.bread
            });
        })
        .catch(err => {});
    };

    render() {
        let disabledControls = {};
        for (let key in this.state.ingredients)
            disabledControls[key] = this.state.ingredients[key] <= 0;

        let burgerAndControlls = <Spinner />;
        if (this.state.ingredients) 
            burgerAndControlls = <MyAux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredients = {Object.keys(this.state.ingredients)}
                               addHandler={this.addIngredientHandler}
                               removeHandler={this.removeIngredientHandler}
                               disabledControls={disabledControls}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable} 
                               onPurchase={this.purchasingHandler} />
                </MyAux>

        let orderSumary = (<OrderSummary ingredients={this.state.ingredients}
                                         continuing={this.purchaseContinueHandler}
                                         closing={this.purchaseCancelHandler} 
                                         price={this.state.totalPrice.toFixed(2)}/>);
        if (this.state.loading)
            orderSumary = <Spinner />;

        return (
            <MyAux>
                <Modal show={this.state.purchasing}
                       closing={this.purchaseCancelHandler}>
                    {orderSumary}
                </Modal>
                {burgerAndControlls}
            </MyAux> )
    }
}

export default withErrorHandler(BurgerBuilder, axios);