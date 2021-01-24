import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try{
            const orders = await axios.get('/orders.json');
         this.setState({
            orders: Object.values(orders.data),
            loading: false
         });
        } catch {
            this.setState({loading: false});
        }
    }

    render(){
        return (
            <div>
            {this.state.orders.map((order ,i) => <Order ingredients={order.ingredients}
                                                   price={order.price} 
                                                   key={i}/>)}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);