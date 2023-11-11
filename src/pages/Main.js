import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../containers/Main';
import PageBase from './PageBase';
import { useTranslation } from 'react-i18next';
import Dashboard from '../containers/Dashboard';

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  html:{
    height: '100%'
  },
  body:{
    height: '100%',
    overflowX: 'hidden',
    margin: 0,
    padding: 0,
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',    
    borderTop: '6px solid #e5af67'
  },
  appBar: {
    paddingBottom:  '58px ',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    color: '#bcbccb',
    height: '58px'
  },
  mainShift:{
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  mainStatic:{
    marginLeft: '70px',
    width: 'calc(100% - 70px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logo:{
    color: '#fff',
    display: 'flex',
    lineHeight: '12px'
  },
  logoImg:{
    maxHeight: '32px !important',
    marginRight: '25px;',
    maxWidth: '100% !important',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    overflow: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#43425d',
    color: '#fff'
  },
  Drawer:{
    backgroundColor: '#43425d',
    minHeight: '100vh'
  },
  drawerPaperClose: {
    width: 70,
    flexGrow: 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#43425d',
    color: '#fff'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    minHeight: '58px'
  },
  subTitleOpen:{
    width: '100%',
    padding: '20px 0px 30px 0px',
    textAlign: 'center',
    
  },
  subTitleClose:{
    width: '0px',
    padding: '0px',
    visibility: 'hidden'
  },
  subTitleText : {
    color: '#ffffff',
    opacity: '0.6',
    fontSize: '12px'
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#f6f6f6',
    padding: theme.spacing(3),
  },
  icon:{
    color: '#9f9fad'
  },
  divider: {
    marginTop: '2em',
    marginBottom: '2em',
  }
}))

function Main() {
  const [t] = useTranslation('translation');
  const classes = useStyles();

  document.title = t('home.title')

  return (
    <MainContainer classes={classes}>
      <PageBase >
        <Dashboard />
      </PageBase>
    </MainContainer>
  )
}

export default Main;