import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { Context } from '../../context';

import AppBar from '../../components/AppBar';
import Menu from '../../components/Menu';
import MenuItems from '../../components/Menu/MenuItems';

import routers from '../../routers';

import * as userActions from '../Profile/profile-actions';
import * as userService from '../../service/user-service';
import * as cartService from '../../service/cart-service';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}))

function MainContainer(props) {
  const { children, history } = props;
  const classes = useStyles();
  
  const [menuOpen, setMobileOpen] = useState(false);
  const [menuNotificationOpen, setMenuNotificationOpen] = useState(false);
 
  const [ state, dispatch ] = useContext(Context);
  const { cart, user } = state;

  const { notifications: { notifications } } = state;

  function handleDrawerToggle() {
    setMobileOpen(!menuOpen);
  }

  function handleDrawerNotificationToggle(event) {
    setMenuNotificationOpen(!menuNotificationOpen);
  }

  function onClickCart(event) {
    return history.push('/cart');
  }

  useEffect(() => {
    if (!user) {
      userService.userInfo().then(user => {
        userService.getFavorites(user.email).then(favorites => dispatch({
          type: userActions.USER_FETCHED,
          user: { ...user, favorites },
        }))
      }).catch(console.error);
    }    
  }, [ user ]);

  useEffect(() => {
    if (!cart.hasFetched) {
      const data = cartService.get();
      dispatch({
        type: 'CART_FETCHED',
        cart: { ...data },
      });
    }    
  }, [ cart ]);

  return (
    <div className={classes.root}>
      <AppBar
        badgeCartContent={cart.items.length}
        badgeNotificationContent={notifications.length}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerNotificationToggle={handleDrawerNotificationToggle}
        menuOpen={menuOpen}
        menuNotificationOpen={menuNotificationOpen}
        onClickCart={onClickCart} />
      <Menu handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}>
        <MenuItems items={routers.filter(item => item.showMenu === true)} />
      </Menu>
      {children}
    </div>
  )
}

export default withRouter(MainContainer);
