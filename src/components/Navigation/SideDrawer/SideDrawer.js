import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import MyAux from '../../../hoc/MyAux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, ''];
    if (props.isOpen)
        attachedClasses[1] = classes.Open;
    else
        attachedClasses[1] = classes.Close;
    return (
        <MyAux>
            <Backdrop show={props.isOpen} clicked={props.onBackdropClick}/>
            <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </MyAux>
    );
};

export default sideDrawer;