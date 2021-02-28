import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import MyAux from '../../../hoc/MyAux/MyAux';

const Modal = props => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return(nextProps.show !== props.show || 
    //         (props.children && props.children.type !== nextProps.children.type));
    // } --> Memo
 
    let style;
    if (props.show) {
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
            <Backdrop show={props.show}
                    clicked={props.closing}/>
            <div className={classes.Modal}
                style={style}>
                {props.children}
            </div>
        </MyAux>
    );
};

function cmpFun(prevProps, nextProps) {
        return(nextProps.show !== prevProps.show || 
            (prevProps.children && prevProps.children.type !== nextProps.children.type));
    }

export default React.memo(Modal, cmpFun);