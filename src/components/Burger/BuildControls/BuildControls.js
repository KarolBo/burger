import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = props.ingredients.map(ingKey => {
        return {
            label: ingKey.charAt(0).toUpperCase() + ingKey.slice(1),
            type: ingKey
        };
    });

    return (<div className={classes.BuildControls}>
        <p>{`You're gonna pay ${props.price.toFixed(2)} $`}</p>
        {controls.map( ctr => <BuildControl key={ctr.label} 
                                            label={ctr.label}
                                            addHandler={() => props.addHandler(ctr.type)}
                                            removeHandler={() => props.removeHandler(ctr.type)} 
                                            isDisabled={props.disabledControls[ctr.type]}/>)}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.onPurchase}>
                    ORDER NOW
        </button>
    </div>);
};

export default buildControls;