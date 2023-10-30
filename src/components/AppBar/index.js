import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  margin: {
    margin: theme.spacing(3),
  },
  menuButton: {
    marginRight: 36,
  },
  menuRigthButton: {
    marginLeft: "auto",
    marginRight: -12,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AppBarComponent({ badgeCartContent, badgeNotificationContent, handleDrawerNotificationToggle, handleDrawerToggle, menuOpen, menuNotificationOpen, onClickCart }) {
  const classes = useStyles();
  const [ t ] = useTranslation('translation');

  return (
    <>
      <AppBar position="fixed" className={clsx(classes.appBar, {
          [classes.appBarShift]: menuOpen,
        })}>
        <Toolbar>
          <IconButton
            color="secondary"
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
            <IconButton color="secondary" edge="start" onClick={onClickCart}>
              <Badge badgeContent={badgeCartContent} className={classes.margin} color='secondary'>
                { 
                  menuNotificationOpen ? (
                    <ShoppingCartIcon  fontSize='default' />
                  ) : (
                    <ShoppingCartOutlinedIcon fontSize='default' />
                  ) 
                }          
              </Badge>
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle} 
            >
              <MoreVertIcon fontSize='inherit' />
            </IconButton>
          </div>          
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AppBarComponent;