import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    color: '#fff',
    display: 'flex',
    lineHeight: '12px',
    marginLeft: 30,
  },
  logoImg: {
    maxHeight: '32px !important',
    marginLeft: 40,
    maxWidth: '100% !important',
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

export default function MenuComponent({ handleDrawerToggle, menuOpen, children }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={menuOpen ? classes.drawer : ''}>
      <Hidden smUp implementation="css">
        <Drawer
          key={'dm1'}
          type="persistent"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={menuOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}>
          <div className={classes.toolbar}>
            <div>
              IA Enterprise)
            </div>

            <IconButton className={classes.logo} onClick={handleDrawerToggle} >
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          {children}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={menuOpen}
          onClose={handleDrawerToggle}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: menuOpen,
            [classes.drawerClose]: !menuOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: menuOpen,
              [classes.drawerClose]: !menuOpen,
            }),
          }}>
          <div className={classes.toolbar}>
            <div>
              IA Enterprise+
            </div>

            <IconButton className={classes.logo} onClick={handleDrawerToggle} >
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
};