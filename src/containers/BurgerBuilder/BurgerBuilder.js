import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyAux from '../../hoc/MyAux/MyAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        current_prices: null,
        purchasable: false,
        purchasing: false,
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
        const queryParams = [];
        for (let key in this.props.ingredients) {
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.staprops.ingredients[key]));
        }
        queryParams.push('price=' + this.props.totalPrice.toFixed(2));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    // addIngredientHandler = (type) => {
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] += 1;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: this.state.totalPrice + this.state.current_prices[type]
    //     });

    //     this.updatePurchasable(updatedIngredients);
    // } 

    // removeIngredientHandler = (type) => {
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     if (updatedIngredients[type] <= 0)
    //         return;

    //     updatedIngredients[type] -= 1;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: this.state.totalPrice - this.state.current_prices[type]
    //     });

    //     this.updatePurchasable(updatedIngredients);
    // } 

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce( (acc, cur) => acc + cur, 0);
        this.setState( {
            purchasable: !!sum
        });
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        // .then(response => {
        //     const ing = response.data;
        //     let ingredients = {}, prices = {};
        //     Object.keys(ing).forEach(ingKey => {
        //         if (ingKey !== 'bread') {
        //             ingredients[ingKey] = 0;
        //             prices[ingKey] = ing[ingKey];
        //         }
        //     });

        //     this.setState({
        //         ingredients,
        //         current_prices: prices,
        //         totalPrice: ing.bread
        //     });
        // })
        // .catch(err => {});
    };

    render() {
        let disabledControls = {};
        for (let key in this.props.ingredients)
            disabledControls[key] = this.props.ingredients[key] <= 0;

        let burgerAndControlls = <Spinner />;
        if (this.props.ingredients) 
            burgerAndControlls = <MyAux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls ingredients = {Object.keys(this.props.ingredients)}
                               addHandler={this.props.addIngredientHandler}
                               removeHandler={this.props.removeIngredientHandler}
                               disabledControls={disabledControls}
                               price={this.props.totalPrice}
                               purchasable={this.state.purchasable} 
                               onPurchase={this.purchasingHandler} />
                </MyAux>

        let orderSumary = (<OrderSummary ingredients={this.props.ingredients}
                                         continuing={this.purchaseContinueHandler}
                                         closing={this.purchaseCancelHandler} 
                                         price={this.props.totalPrice.toFixed(2)}/>);

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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, 
                                                     ingredientName: ingName}),
        removeIngredientHandler: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, 
                                                     ingredientName: ingName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));