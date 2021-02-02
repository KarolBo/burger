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

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData)
    .then(res => {
        dispatch(purchaseSuccess(res.data));
    })
    .catch(err => {
       dispatch(purchaseFail(err));
    });
    }
};