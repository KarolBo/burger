import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error
    }
};

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData
    }
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json?auth=' + token, orderData)
    .then(res => {
        dispatch(purchaseSuccess(res.data.name));
    })
    .catch(err => {
       dispatch(purchaseFail(err));
    });
    }
};

export const purcharedReset = () => {
    return {
        type: actionTypes.PURCHASED_RESET
    }
}

export const fetchingStart = () => {
    return {
        type: actionTypes.FETCHING_ORDERS_START
    }
}

export const fetchOrders = token => {
    return async dispatch => {
        try {
            dispatch(fetchingStart());
            const orders = await axios.get('/orders.json?auth=' + token);
            dispatch({
                type: actionTypes.FETCHING_ORDERS_SUCCESS,
                orders: Object.values(orders.data)
            });
        } catch {
            return {
                type: actionTypes.FETCHING_ORDERS_FAIL,
            }
        }
    } 
}