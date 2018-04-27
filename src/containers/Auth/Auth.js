import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import classes from './Auth.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
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
          placeholder: 'Password'
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
    isSignUp: true
  }

  componentDidMount () {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        this.props.onSetAuthRedirectPath('/');
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prev => {
      return {isSignUp: !prev.isSignUp}
    })
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName] : {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({controls: updatedControls})
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value, 
      this.state.controls.password.value, 
      this.state.isSignUp
    )
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let errorMessage = null;

    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        changed={e => this.inputChangedHandler(e, formElement.id)}
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType='Danger'>Switch to {this.state.isSignUp ? 'sign in' : 'sign up'}</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);