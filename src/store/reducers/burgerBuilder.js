import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    current_prices: null,
    building: false
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + state.current_prices[action.ingredientName],
                building: true
            };             
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - state.current_prices[action.ingredientName],
                building: true
            };       
        case actionTypes.FETCH_INGREDIENTS:
            const ing = action.ingredients.data;
            let ingredients = {}, prices = {};
            Object.keys(ing).forEach(ingKey => {
                if (ingKey !== 'bread') {
                    ingredients[ingKey] = 0;
                    prices[ingKey] = ing[ingKey];
                }
            });
            
            ingredients = {
                salad: ingredients.salad,
                bacon: ingredients.bacon,
                cheese: ingredients.cheese,
                meat: ingredients.meat
            }

            return {
                ...state,
                ingredients,
                current_prices: prices,
                totalPrice: ing.bread,
                building: false
            };
        default:
            return state;
    }
};

export default reducer;

