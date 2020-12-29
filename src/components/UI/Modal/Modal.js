import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import MyAux from '../../../hoc/MyAux';

const modal = (props) => {
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

export default modal;