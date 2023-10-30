import React, { useState } from 'react';
import classnames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import severityClasse from '../../helpers/severity-notification-class';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    minWidth: 200,
  },
  root: {
    width: '100%',
    maxWidth: 300,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  inline: {
    display: 'block',
    alignContent: 'center',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
}));

const NotificationComponent = React.forwardRef(({ 
  actions = { close: false, expand: false }, notification, onClose, onExpanded, id,
}, ref) => {
  const customClasses = severityClasse(notification.severity);
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  function createActions(actions) {
    return (
      <>
        { (actions.expand) ? (
            <IconButton
              aria-label="Show more"
              className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
              onClick={handleExpandClick}>
                <ExpandMoreIcon />
            </IconButton>
          ) : '' }
        { (actions.close) ? (
            <IconButton className={classes.expand} onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          ) : '' } 
      </>
    )
  };

  function handleExpandClick() {
    setExpanded(!expanded);
    if (onExpanded) onExpanded(expanded);
  };

  function handleDismiss() {
    if (onClose) onClose(id);
  };

  return (
    <Card ref={ref}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" style={customClasses.avatar}></Avatar>}
        action={createActions(actions)}
        title={notification.title}
        subheader={`${notification.message}`}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper className={classes.collapse}>
            <Typography gutterBottom>PDF ready</Typography>
            <Button size="small" className={classes.button}>
              <CheckCircleIcon className={classes.checkIcon} />
              Download now
            </Button>
        </Paper>
      </Collapse>
    </Card>
  )
});

export default NotificationComponent;