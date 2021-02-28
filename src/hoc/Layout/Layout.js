import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../MyAux/MyAux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawerOpen, setsideDrawerOpen] = useState(false);

    return (
        <Aux>
        <Toolbar isAuth={props.isAuthenticated} 
                    onMenuClick={() => setsideDrawerOpen((prevState) => !prevState)} />
        <SideDrawer isAuth={props.isAuthenticated} 
                    isOpen={sideDrawerOpen} 
                    onBackdropClick={() => setsideDrawerOpen(false)}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    );
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    }
};

export default connect(mapStateToProps)(Layout);