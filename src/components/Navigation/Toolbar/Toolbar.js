import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerIcon from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <HamburgerIcon clicked={props.sideDrawerOpen}/>
    <div className={classes.Logo}><Logo /></div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>  
);

export default toolbar;

