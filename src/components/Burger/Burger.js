import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])]
        .map( (_, i) => <BurgerIngredient key={ingKey+i} type={ingKey} />);
    })
    .reduce( (arr, elem) => arr.concat(elem));

    let burgerContent = "Please start adding ingredients!"
    if (transformedIngredients.length)
        burgerContent = transformedIngredients;

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {burgerContent}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;