import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import style from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    });
    const [isSignIn, setIsSignIn] = useState(true);

    const { building, rediretcPath, onSetRedirectPath } = props

    useEffect(() => {
        if (!building && rediretcPath !== '/') {
            onSetRedirectPath();
        }
    }, [building, rediretcPath, onSetRedirectPath]);

    const switchSignIn = () => {
        setIsSignIn(prevState => !prevState);
    }

    const inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
            ...controls[controlName],
            value: e.target.value,
            valid: checkValidity(e.target.value, controls[controlName].validation),
            touched: true
            }
        };
        setControls(updatedControls);
    }

    const checkValidity = ( value, rules ) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }
    
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }
    
        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }
    
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }
    
        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
    
        return isValid;
    }

    const onSubmit = event => {
        event.preventDefault();
        props.authenticate(controls.email.value, 
                           controls.password.value,
                           isSignIn);
    }
 
    let my_controls = (
            Object.keys(controls).map( my_input => <Input elementType={controls[my_input].elementType} 
                                                                        elementConfig={controls[my_input].elementConfig} 
                                                                        value={controls[my_input].value} 
                                                                        changed={event => inputChangedHandler(event, my_input)}
                                                                        invalid={!controls[my_input].valid}
                                                                        shouldValidate={!!controls[my_input].validation}
                                                                        touched={controls[my_input].touched}
                                                                        key={my_input} /> ) );
    if (props.loading) 
        my_controls = <Spinner />;
    let error_msg = null;
    if (props.error) 
        error_msg = <p>{props.error.message}</p>
    const redirect = props.isAuth ? <Redirect to='/'/> : null;
    return (
        <div>
            {redirect}
            {props.isAuth ? <Redirect to={props.rediretcPath}/> : null}
            <form onSubmit={onSubmit} className={style.Auth}>
                {error_msg}
                {my_controls}
                <Button disabled={false} 
                        btnType='Success'>
                            SUBMIT
                </Button>
            </form>
                <Button disabled={false} 
                        btnType='Danger' 
                        onClick={switchSignIn}>
                    SWITCH TO {isSignIn ? 'SIGNUP' : 'SIGNIN'}
                </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: !!state.auth.token,
        building: state.burgerBuilder.building,
        rediretcPath: state.auth.authRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignIn) => dispatch(actions.authenticate(email, password, isSignIn)),
        onSetRedirectPath: () => dispatch(actions.setPathRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);