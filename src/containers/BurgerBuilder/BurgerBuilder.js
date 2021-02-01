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
import { addIngredient, removeIngredient, fetchIngredients } from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
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
        this.props.history.push('/checkout');
    }

    updatePurchasable(ingredients) {
        if (!ingredients) return false;
        const sum = Object.values(ingredients).reduce( (acc, cur) => acc + cur, 0);
        return !!sum;
    }

    componentDidMount() {
        this.props.fetchIngredients();
    };

    render() {
        let disabledControls = {};
        for (let key in this.props.ingredients)
            disabledControls[key] = this.props.ingredients[key] <= 0;

        const purchasable = this.updatePurchasable(this.props.ingredients);

        let burgerAndControlls = <Spinner />;
        if (this.props.ingredients) 
            burgerAndControlls = <MyAux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls ingredients = {Object.keys(this.props.ingredients)}
                               addHandler={this.props.addIngredientHandler}
                               removeHandler={this.props.removeIngredientHandler}
                               disabledControls={disabledControls}
                               price={this.props.totalPrice}
                               purchasable={purchasable} 
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
        addIngredientHandler: (ingName) => dispatch(addIngredient(ingName)),
        removeIngredientHandler: (ingName) => dispatch(removeIngredient(ingName)),
        fetchIngredients: () => dispatch(fetchIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));