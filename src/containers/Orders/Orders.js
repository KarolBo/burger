import React from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component { 
   
    async componentDidMount() {
        this.props.fetchOrders(this.props.userId, this.props.token);            
    }

    render(){
        let orders = <Spinner />;
        if (!this.props.loading) 
            orders = this.props.orders.map((order ,i) => <Order ingredients={order.ingredients}
                                                                price={order.price} 
                                                                key={i}/>);
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (userId, token) => dispatch(actions.fetchOrders(userId, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));