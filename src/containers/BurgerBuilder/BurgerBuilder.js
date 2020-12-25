import React, { Component } from 'react';

import MyAux from '../../hoc/MyAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1, 
            bacon: 1,
            cheese: 2, 
            meat: 1
        }
    }

    render() {
        return (
            <MyAux>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    Controllers
                </div>
            </MyAux> )
    }
}

export default BurgerBuilder;