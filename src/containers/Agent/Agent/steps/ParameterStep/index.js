import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { get } from 'lodash';

export const ParameterStep = ({ handleAgentChange, agent }) => {
  return (
    <>
      <Grid item xs={12} sm={6} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>Chat Config</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Temperature*</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="temperature"
                  onChange={(e) => handleAgentChange(e, 'chatConfig')}
                  size="small"
                  value={get(agent, 'chatConfig.temperature', '')}
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Top P*</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="topP"
                  onChange={(e) => handleAgentChange(e, 'chatConfig')}
                  value={get(agent, 'chatConfig.topP', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Frequency Penalty*</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="frequencyPenalty"
                  onChange={(e) => handleAgentChange(e, 'chatConfig')}
                  value={get(agent, 'chatConfig.frequencyPenalty', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Presence Penalty*</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="presencePenalty"
                  onChange={(e) => handleAgentChange(e, 'chatConfig')}
                  value={get(agent, 'chatConfig.presencePenalty', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Max Tokens</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="maxTokens"
                  onChange={(e) => handleAgentChange(e, 'chatConfig')}
                  value={get(agent, 'chatConfig.maxTokens', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>LLM Config</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Type</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="type"
                  onChange={(e) => handleAgentChange(e, 'llmConfig')}
                  value={get(agent, 'llmConfig.type', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Model</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="model"
                  onChange={(e) => handleAgentChange(e, 'llmConfig')}
                  value={get(agent, 'llmConfig.model', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Instance</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="instance"
                  onChange={(e) => handleAgentChange(e, 'llmConfig')}
                  value={get(agent, 'llmConfig.instance', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>API Key</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="apiKey"
                  onChange={(e) => handleAgentChange(e, 'llmConfig')}
                  value={get(agent, 'llmConfig.apiKey', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>API Version</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  name="apiVersion"
                  onChange={(e) => handleAgentChange(e, 'llmConfig')}
                  value={get(agent, 'llmConfig.apiVersion', '')}
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>System Message</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="systemMesssage"
              onChange={(e) => handleAgentChange(e)}
              value={get(agent, 'systemMesssage', '')}
              size="small"
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}