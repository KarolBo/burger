import React, { Component } from 'react';
import Dialog from '../../components/UI/Modal/Modal';
import MyAux from '../../hoc/MyAux/MyAux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: false
        };

        errorConfirmHandler = () => {
            this.setState({
                error: null
            });
        }

        componentWillMount() {
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({
                    error: err
                });
            });

            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <MyAux>
                    <Dialog show={!!this.state.error}
                            closing={this.errorConfirmHandler}>
                        {!!this.state.error ? this.state.error.message : null}
                    </Dialog>
                    <WrappedComponent {...this.props} />
                </MyAux>
            );
        }
    }
};

export default withErrorHandler;