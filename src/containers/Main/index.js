import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Context } from '../../context/AppContext';

import AppBar from '../../components/AppBar';
import Menu from '../../components/Menu';
import MenuItems from '../../components/Menu/MenuItems';

import routers from '../../routers';

import * as userActions from '../Profile/profile-actions';
import * as userService from '../../service/user-service';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}))

function MainContainer(props) {
  const { children, history } = props;
  const classes = useStyles();

  const [t, i18n] = useTranslation('translation')
  
  const [menuOpen, setMobileOpen] = useState(false);
  const [menuNotificationOpen, setMenuNotificationOpen] = useState(false);
 
  const [ state, dispatch ] = useContext(Context);
  const { user } = state;

  const { notifications: { notifications } } = state;

  function handleDrawerToggle() {
    setMobileOpen(!menuOpen);
  }

  function handleDrawerNotificationToggle(event) {
    setMenuNotificationOpen(!menuNotificationOpen);
  }

  function onClickTitle() {
    return history.push('/');
  }

  function onSelectLanguage(lang) {
    lang && i18n.changeLanguage(lang);

    dispatch({
      type: userActions.USER_SET_LANGUAGE,
      language: lang,
    })
    
    document.title = t('home.title')
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


  return (
    <div className={classes.root}>
      <AppBar
        badgeNotificationContent={notifications.length}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerNotificationToggle={handleDrawerNotificationToggle}
        menuOpen={menuOpen}
        menuNotificationOpen={menuNotificationOpen}
        onClickTitle={onClickTitle} 
        onSelectLanguage={onSelectLanguage}/>
      <Menu handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}>
        <MenuItems items={routers.filter(item => item.showMenu === true)} lang={user.language} />
      </Menu>
      {children}
    </div>
  )
}

export default withRouter(MainContainer);
