import React from 'react';
import { Grid, TextField, FormControlLabel, Switch, Typography } from '@material-ui/core';

import { get } from 'lodash';

export const DatabaseStep = ({ handleAgentChange, agent }) => {
  return (
    <>
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>Database Settings</Typography>
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
                  size="small"
                  name="type"
                  value={get(agent, 'dataSourceConfig.type', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Database</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="database"
                  value={get(agent, 'dataSourceConfig.database', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                  value={get(agent, 'dataSourceConfig.host', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                <Typography variant='body2'>Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="name"
                  value={get(agent, 'dataSourceConfig.name', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                <Typography variant='body2'>Username</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="username"
                  value={get(agent, 'dataSourceConfig.username', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                  value={get(agent, 'dataSourceConfig.password', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                  value={get(agent, 'dataSourceConfig.port', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                <Typography variant='body2'>Includes Tables</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="includesTables"
                  value={get(agent, 'dataSourceConfig.includesTables', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                <Typography variant='body2'>Data Source</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="dataSource"
                  value={get(agent, 'dataSourceConfig.dataSource', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
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
                <Typography variant='body2'>Synchronize</Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControlLabel
                  control={
                    <Switch
                      color='primary'
                      name="synchronize"
                      checked={get(agent, 'dataSourceConfig.synchronize', false)}
                      onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
                    />
                  }
                  value={get(agent, 'dataSourceConfig.synchronize', false)}
                  style={{ color: 'black', marginTop: '10px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={12}>
                <Typography variant='body2'>Customize System Message</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="customizeSystemMessage"
                  value={get(agent, 'dataSourceConfig.customizeSystemMessage', '')}
                  onChange={(e) => handleAgentChange(e, 'dataSourceConfig')}
                  size="small"
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}