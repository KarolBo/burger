import React, { Component } from 'react';

import MyAux from '../../hoc/MyAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    render() {
        return (
            <MyAux>
                <Burger />
                <div>
                    Controllers
                </div>
            </MyAux> )
    }
}

export default BurgerBuilder;