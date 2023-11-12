import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useStyles } from './styles';

import { Grid, Button, Paper, Typography, useMediaQuery, Hidden } from '@material-ui/core';
import PlaygroundChatIcon from '../../assets/images/playground-chat.svg';
import { getAgents } from '../../service/agent-service';
import { SnackbarContext } from '../../context/SnackbarContext';
import { Context } from '../../context/AppContext';
import { AGENTS_SET_AGENTS_LIST } from '../Agent/agent-actions';
import { getLocallyChatsList, handleNewChat } from '../../service/chat-service';
import { withRouter } from 'react-router';

function Dashboard({ history }) {
  const [chats] = useState(getLocallyChatsList())
  const mobile = useMediaQuery('(max-width:599px)');

  const [t] = useTranslation('translation');
  const classes = useStyles();

  const { setSnackbar } = useContext(SnackbarContext)
  const [state, dispatch] = useContext(Context);

  useEffect(async () => {
    const agents = await getAgents()

    if (agents.error) return setSnackbar({ title: 'Ocorreu um erro ao recuperar agentes.', severity: 'error' })

    dispatch({
      type: AGENTS_SET_AGENTS_LIST,
      agents: agents
    })
  }, [])

  const goTo = (path) => {
    history.push(path)
  }


  return (
    <main className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {t('home.dashboard.playound.title')}
                </Typography>
                <span className={classes.playoundSubtitle}>
                {t('home.dashboard.playound.subtitle')}
                </span>
              </Grid>
              <Grid item xs={12} className={classes.playgroundActions}>
                <Button size="small"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleNewChat({ key: 'default' })
                  }>
                  {t('home.dashboard.playound.button')}
                </Button>
                <Hidden smDown>
                  <img src={PlaygroundChatIcon} width="89px" style={{ 'opacity': '0.3' }}/>
                </Hidden>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} className={classes.agents}>
          <Paper className={classes.paper} style={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                {t('home.dashboard.agents.title')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.counter}>
                  {state.agents.items.length || 0}
                </span>
                <br />
                <span className={classes.couterName}>
                {t('home.dashboard.agents.count')}
                </span>
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Button 
                size="small" 
                color="primary" 
                variant="contained" 
                className={classes.button}
                onClick={() => goTo('/agents')}
                >
                  {t('home.dashboard.agents.button')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} className={classes.agents}>
          <Paper className={classes.paper} style={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                {t('home.dashboard.chat.title')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.counter}>
                  {chats.length || 0}
                </span>
                <br />
                <span className={classes.couterName}>
                {t('home.dashboard.chat.count')}
                </span>
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Button 
                size="small" 
                color="primary" 
                variant="contained" 
                className={classes.button}
                onClick={() => goTo('/history-chats')}
                >
                  {t('home.dashboard.chat.button')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </main>
  )
}

export default withRouter(Dashboard);