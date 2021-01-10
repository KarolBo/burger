import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import MyAux from '../../../hoc/MyAux/MyAux';

class Modal extends Component {
    // A pure component would check also other properties, such as closing
    shouldComponentUpdate(nextProps, nextState) {
        return(nextProps.show !== this.props.show || 
            (this.props.children && this.props.children.type !== nextProps.children.type));
    }

    componentDidUpdate() {
        console.log('[Modal] did update');
    };
 
    render() {
        let style;
        if (this.props.show) {
            style = {
                transform: 'TranslateY(0)',
                opacity: 1
            };
        } else {
            style = {
                transform: 'TranslateY(-100vh)',
                opacity: 0
            };
        };

        return (
            <MyAux>
                <Backdrop show={this.props.show}
                        clicked={this.props.closing}/>
                <div className={classes.Modal}
                    style={style}>
                    {this.props.children}
                </div>
            </MyAux>
        );
    }
};

export default Modal;