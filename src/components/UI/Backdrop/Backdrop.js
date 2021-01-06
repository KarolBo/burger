import React from 'react';
import classes from './Backdrop.module.css';
import propTypes from 'prop-types';

const backdrop = (props) => {
    if (props.show)
        return (
            <div className={classes.Backdrop}
                onClick={props.clicked}>    
            </div>
        );
    return null;
    
};

backdrop.propTypes = {
    show: propTypes.bool,
    clicked: propTypes.func
};

export default backdrop;