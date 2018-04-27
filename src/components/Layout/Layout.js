import React, {Component, Fragment} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggledHandler = () => {
    this.setState((prevState)=>({showSideDrawer: !prevState.showSideDrawer}));
  }

  render() {
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          sideDrawerOpen={this.sideDrawerToggledHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler} 
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(Layout);