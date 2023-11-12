import React, { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { Grid, Paper, Typography, Box, Button, Divider } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { SnackbarContext } from '../../../context/SnackbarContext';
import { Context } from '../../../context/AppContext';
import TeamsIcon from '../../../assets/images/teams.svg';
import SlackIcon from '../../../assets/images/slack.svg';

import { useStyles } from './styles'

import { AGENTS_SET_AGENTS_LIST } from '../agent-actions';
import { getAgents } from '../../../service/agent-service';
import { handleNewChat } from '../../../service/chat-service';

const ListAgentsContainer = ({ history }) => {
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

  return (
    <>
      <section>
        <Box my={2}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => { history.push('/agent/new') }}>
                {t('agent.page.button.new.agent')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid container spacing={2}>
            {state.agents.items.map((agent, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item xs={10}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Box pb={2}>
                              <Typography variant="h6" className={classes.cardTitle}>
                                {agent.name || 'Agent Name'}
                              </Typography>
                            </Box>
                            <Box mt={1} onClick={() => { handleNewChat(agent, state.user.language) }}>
                              <Typography variant="body2" className={classes.link}>
                                {t('agent.page.card.agent.new.chat')}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          spacing={1}
                        >
                          <Grid item xs={6}>
                            <EditRoundedIcon
                              style={{ color: '#8898aa', cursor: 'pointer' }}
                              onClick={() => { history.push(`/agent/${agent.key}`) }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item xs={9} >
                            <Typography variant="body2" >
                              {agent.key === 'default' ?
                                t('agent.page.card.agent.custom') :
                                t('agent.page.card.agent.specialized')
                              }
                            </Typography>
                            <Typography variant="subtitle2" color='textSecondary'>
                              {t('agent.page.card.agent')}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <div style={{ paddingRight: '10px', textAlign: 'right' }}>
                              <img src={TeamsIcon} height="24" alt="Teams" />
                            </div>
                          </Grid>
                          <Grid item xs={1}>
                            <img src={SlackIcon} height="24" alt='Slack' />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
    </>
  )
}

export default withRouter(ListAgentsContainer);