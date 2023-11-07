import React from "react"
import { get } from 'lodash'
import { Grid, TextField, Typography, FormControlLabel, Switch } from '@material-ui/core';

export const AgentTextField = ({ config, agent, field, handleAgentChange, xsGrid = 8, value, style }) => {
  return (
    <>
      {
        field.label &&
        <Grid item xs={4}>
          <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
        </Grid>
      }

      <Grid item xs={xsGrid}>
        {field.name === 'synchronize' ?
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
          :
          <TextField
            required
            name={field.name}
            onChange={(e) => handleAgentChange(e, config.namePath)}
            size="small"
            type={field.type || 'text'}
            value={value}
            style={style}
          />
        }
      </Grid>
    </>
  )
}