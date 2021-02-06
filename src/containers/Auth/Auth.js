import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import style from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignIn: true
    }

    switchSignIn = () => {
        this.setState(prevState => {
            return { isSignIn: !prevState.isSignIn }
        });
    }

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
            ...this.state.controls[controlName],
            value: e.target.value,
            valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
            touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })
    }

    checkValidity = ( value, rules ) => {
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

    onSubmit = event => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, 
                                this.state.controls.password.value,
                                this.state.isSignIn);
    }

    render() {
        let controls = (
                Object.keys(this.state.controls).map( my_input => <Input elementType={this.state.controls[my_input].elementType} 
                                                                           elementConfig={this.state.controls[my_input].elementConfig} 
                                                                           value={this.state.controls[my_input].value} 
                                                                           changed={event => this.inputChangedHandler(event, my_input)}
                                                                           invalid={!this.state.controls[my_input].valid}
                                                                           shouldValidate={!!this.state.controls[my_input].validation}
                                                                           touched={this.state.controls[my_input].touched}
                                                                           key={my_input} /> ) );
        return (
            <div>
                <form onSubmit={this.onSubmit} className={style.Auth}>
                    {controls}
                    <Button disabled={false} 
                            btnType='Success'>
                                SUBMIT
                    </Button>
                    <Button disabled={false} 
                            btnType='Danger' 
                            onClick={this.switchSignIn}>
                        SWITCH TO {this.state.isSignIn ? 'SIGNUP' : 'SIGNIN'}
                    </Button>
                </form>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignIn) => dispatch(actions.authenticate(email, password, isSignIn))
    }
}

export default connect(null, mapDispatchToProps)(Auth);