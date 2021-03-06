import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASED_RESET:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
                purchased: false
            }
        case actionTypes.FETCHING_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCHING_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionTypes.FETCHING_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;