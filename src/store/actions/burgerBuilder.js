import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {type: actionTypes.ADD_INGREDIENT, 
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: ingName
    }
};

export const getIngredients = ings => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ings
    }
};

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(ings => {
            dispatch(getIngredients(ings));
        })
        .catch(err => {});
    }
};
