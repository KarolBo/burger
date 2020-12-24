import React from 'react';
import Aux from '../../hoc/MyAux';

const layout = props => (
    <Aux>
        <div>toolbar, side drawer, backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;