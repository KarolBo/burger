import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyAux from '../../hoc/MyAux/MyAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient, setPathRedirect, fetchIngredients, purcharedReset } from '../../store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const isAuth = useSelector(state => !!state.auth.token);

    const addIngredientHandler = (ingName) => dispatch(addIngredient(ingName));
    const removeIngredientHandler = (ingName) => dispatch(removeIngredient(ingName));
    const fetchIngredientsHandler = useCallback(() => dispatch(fetchIngredients()), [dispatch]);
    const purcharedResetHandler = () => dispatch(purcharedReset());
    const onSetRedirectPath = (newPath) => dispatch(setPathRedirect(newPath));

    const purchasingHandler = () => {
        if (isAuth)
            setPurchasing(true);
        else {
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        purcharedResetHandler();
        props.history.push('/checkout');
    }

    function updatePurchasable(ing) {
        if (!ing) return false;
        const sum = Object.values(ing).reduce( (acc, cur) => acc + cur, 0);
        return !!sum;
    }

    useEffect(fetchIngredientsHandler, [fetchIngredientsHandler]);

    let disabledControls = {};
    for (let key in ingredients)
        disabledControls[key] = ingredients[key] <= 0;

    const sum = updatePurchasable(ingredients);

    let burgerAndControlls = <Spinner />;
    if (ingredients) 
        burgerAndControlls = <MyAux>
            <Burger ingredients={ingredients}/>
            <BuildControls ingredients = {Object.keys(ingredients)}
                            addHandler={addIngredientHandler}
                            removeHandler={removeIngredientHandler}
                            disabledControls={disabledControls}
                            price={totalPrice}
                            purchasable={sum} 
                            onPurchase={purchasingHandler} 
                            isAuth={isAuth} />
            </MyAux>

    let orderSumary = (<OrderSummary ingredients={ingredients}
                                        continuing={purchaseContinueHandler}
                                        closing={purchaseCancelHandler} 
                                        price={totalPrice.toFixed(2)}/>);

    return (
        <MyAux>
            <Modal show={purchasing}
                    closing={purchaseCancelHandler}>
                {orderSumary}
            </Modal>
            {burgerAndControlls}
        </MyAux> )
}

export default withErrorHandler(BurgerBuilder, axios);