import * as actionTypes from './actions';

const initialState = {
    ingredients: {salad: 0,
                  bacon: 0,
                  cheese: 0,
                  meat: 0},
    totalPrice: 4,
    current_prices: {
        salad: 0.6,
        bacon: 1,
        cheese: 0.9,
        meat: 2
    }};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + state.current_prices[action.ingredientName]
            };             
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - state.current_prices[action.ingredientName]
            };          
        default:
            return state;
    }
};

export default reducer;

