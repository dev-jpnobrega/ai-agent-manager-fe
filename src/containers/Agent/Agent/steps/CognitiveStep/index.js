import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { get } from 'lodash';

export const CognitiveStep = ({ handleAgentChange, agent }) => {
  return (
    <>
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>Congnitive Service Settings</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Search API Key</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="apiKey"
                  value={get(agent, 'vectorStoreConfig.apiKey', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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
                <Typography variant='body2'>Search Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="name"
                  value={get(agent, 'vectorStoreConfig.name', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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
                <Typography variant='body2'>Search Index</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="indexes"
                  value={get(agent, 'vectorStoreConfig.indexes', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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
                <Typography variant='body2'>Search Version</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="apiVersion"
                  value={get(agent, 'vectorStoreConfig.apiVersion', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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
                <Typography variant='body2'>Search Vector Field Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="vectorFieldName"
                  value={get(agent, 'vectorStoreConfig.vectorFieldName', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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
                <Typography variant='body2'>Search Type</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="type"
                  value={get(agent, 'vectorStoreConfig.type', '')}
                  onChange={(e) => handleAgentChange(e, 'vectorStoreConfig')}
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