import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = [
        {label: 'Meat', type: 'meat'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'salad', type: 'salad'}
    ];

    return (<div className={classes.BuildControls}>
        <p>{`You're gonna pay ${props.price} $`}</p>
        {controls.map( ctr => <BuildControl key={ctr.label} 
                                            label={ctr.label}
                                            addHandler={() => props.addHandler(ctr.type)}
                                            removeHandler={() => props.removeHandler(ctr.type)} 
                                            isDisabled={props.disabledControls[ctr.type]}/>)}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}>
                    ORDER NOW
        </button>
    </div>);
};

export default buildControls;