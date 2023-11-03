import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { get } from 'lodash';

export const HistoryStep = ({ handleAgentChange, agent }) => {
  return (
    <>
      <Grid item xs={12} style={{ marginTop: '12px' }}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography variant='subtitle2' color='textSecondary'>History Enable Settings</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                  <Typography variant='body2'>Type</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    name="type"
                    onChange={(e) => handleAgentChange(e, 'dbHistoryConfig')}
                    value={get(agent, 'dbHistoryConfig.type', '')}
                    size="small"
                    style={{ width: '100%', maxWidth: '250px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                  <Typography variant='body2'>Host</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    name="host"
                    onChange={(e) => handleAgentChange(e, 'dbHistoryConfig')}
                    value={get(agent, 'dbHistoryConfig.host', '')}
                    size="small"
                    style={{ width: '100%', maxWidth: '250px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                  <Typography variant='body2'>Port</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    name="port"
                    onChange={(e) => handleAgentChange(e, 'dbHistoryConfig')}
                    value={get(agent, 'dbHistoryConfig.port', '')}
                    size="small"
                    style={{ width: '100%', maxWidth: '250px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                  <Typography variant='body2'>Password</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    name="password"
                    value={get(agent, 'dbHistoryConfig.password', '')}
                    onChange={(e) => handleAgentChange(e, 'dbHistoryConfig')}
                    size="small"
                    style={{ width: '100%', maxWidth: '250px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                  <Typography variant='body2'>Session TTL</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    name="sessionTTL"
                    value={get(agent, 'dbHistoryConfig.sessionTTL', '')}
                    onChange={(e) => handleAgentChange(e, 'dbHistoryConfig')}
                    size="small"
                    style={{ width: '100%', maxWidth: '250px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </>
  )
}