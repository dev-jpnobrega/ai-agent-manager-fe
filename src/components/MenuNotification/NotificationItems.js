import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import Notification from '../Notification';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatarBackground: {
    backgroundColor: deepOrange[500],
  }
}));

export default function NotificationsComponent({ notifications }) {
  const classes = useStyles();

  return (notifications.length > 0) ? (
    <List className={classes.root}>
      {
        notifications.map((notification, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <Notification notification={notification} />
          </ListItem>
        ))
      }
    </List>
  ) : (<div/>);
}