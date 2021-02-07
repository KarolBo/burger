import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const authLink = props.isAuth ? <NavigationItem link="/logout" >Log Out</NavigationItem>
                                : <NavigationItem link="/auth" >Authorization</NavigationItem>;
    const ordersLink = props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem>
                                    : null;
    return (<ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        {ordersLink}
        {authLink}
    </ul>);
};

export default navigationItems;