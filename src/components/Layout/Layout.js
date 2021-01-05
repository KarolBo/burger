import React, {Component} from 'react';
import Aux from '../../hoc/MyAux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerOpen: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            sideDrawerOpen: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState( prevState => ({sideDrawerOpen: !prevState.sideDrawerOpen}));
    }

    render() {
        return (
            <Aux>
            <Toolbar onMenuClick={this.sideDrawerToggleHandler} />
            <SideDrawer isOpen={this.state.sideDrawerOpen} onBackdropClick={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    };
} 

export default Layout;