import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
import Spinner  from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  transformIngredients (ingredients) {
    const transformIngredients = [];
    for (let ingredientName in ingredients) {
      transformIngredients.push({name: ingredientName, amount: ingredients[ingredientName]})
    }
    return transformIngredients;
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map(o => (
          <Order 
            key={o.id}
            price={o.price}
            ingredients={this.transformIngredients(o.ingredients)}
          />
        ))
      )
    }
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));