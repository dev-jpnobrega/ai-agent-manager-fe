import React, { useState } from 'react';
import clsx  from 'clsx';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
    zIndex: 1000,
  },
  drawerPaper: {
    marginLeft: "auto",
    marginTop: 60,
    marginRight: 5,
    width: drawerWidth,
    zIndex: 1200,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MenuNotificationsComponent({
 children, handleDrawerNotificationToggle, menuNotificationOpen
}) {
  const classes = useStyles();

  return (
    <nav>
      <Hidden smUp implementation="css">
        <Drawer
          id={'12'}  
          key={'dm1'}
          variant="temporary"
          anchor='top'
          open={Boolean(menuNotificationOpen)}
          onClose={handleDrawerNotificationToggle}
          classes={{ paper: classes.drawerPaper }}
          BackdropProps={{ classes: { root: classes.root }}}
          PaperProps={{ style: { position: 'relative' } }}
          ModalProps={{ keepMounted: true }}>
            {children}
        </Drawer>
      </Hidden>
    </nav>
  );
};