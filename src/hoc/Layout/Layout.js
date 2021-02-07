import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../MyAux/MyAux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
            <Toolbar isAuth={this.props.isAuthenticated} 
                     onMenuClick={this.sideDrawerToggleHandler} />
            <SideDrawer isAuth={this.props.isAuthenticated} 
                        isOpen={this.state.sideDrawerOpen} 
                        onBackdropClick={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    };
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    }
};

export default connect(mapStateToProps)(Layout);