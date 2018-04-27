import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';

export class BurgerBuilder extends Component {
  state = {
    purhasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  purchaseHandler = ()  => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  updatePurchasable = () => {
    const ingredients = {
      ...this.props.ingredients
    };

    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((acc, next) => acc + next);
    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render(){
    // defines which buttons should be disabled
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    
    let orderSummary = null;
    let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />
    
    if (this.props.ingredients){
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable()}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Fragment>
      )

      orderSummary = (
        <OrderSummary 
          price={this.props.totalPrice}
          ingredients={this.props.ingredients} 
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    
    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing} 
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => (
      dispatch(actions.addIngredient(ingredientName))
    ),
    onIngredientRemoved: (ingredientName) => (
      dispatch(actions.removeIngredient(ingredientName))
    ),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));