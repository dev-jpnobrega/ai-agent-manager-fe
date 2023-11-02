import React from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useStyles } from './styles'

function AppBarComponent({ handleDrawerToggle, menuOpen, onClickCart }) {
  const classes = useStyles();
  const [t] = useTranslation('translation');

  return (
    <AppBar position="fixed" color="default" className={clsx(classes.appBar, {
      [classes.appBarShift]: menuOpen,
    })}>
      <Toolbar>
        <IconButton
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={clsx(classes.menuButton, {
            [classes.hide]: menuOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography color='textPrimary' variant="h6" noWrap>
          <Link href="/" color='textPrimary' >
            {t('home.title')}
          </Link>
        </Typography>
        <div className={classes.menuRigthButton}>
          <IconButton edge="start" onClick={onClickCart}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MoreVertIcon fontSize='inherit' />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent;