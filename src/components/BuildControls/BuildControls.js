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
        {controls.map( ctr => <BuildControl key={ctr.label} 
                                            label={ctr.label}
                                            addHandler={() => props.addHandler(ctr.type)} />)}
    </div>);
};

export default buildControls;