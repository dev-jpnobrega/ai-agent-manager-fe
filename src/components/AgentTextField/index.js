import React from "react"
import { get } from 'lodash'
import { Select, MenuItem, FormControl, Grid, TextField, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import { useStyles } from './styles'

export const AgentTextField = ({ config, agent, field, handleAgentChange, xsGrid = 8, value }) => {
  const [t] = useTranslation('translation')
  const classes = useStyles()
  const { type = 'input' } = field

  return (
    <>
      {
        field.label &&
        <Grid item xs={4}>
          <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
        </Grid>
      }

      <Grid item xs={xsGrid} style={{ paddingTop: '12px' }}>
        {type === 'switch' &&
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
        }
        {type === 'input' &&
          <TextField
            className={classes.root}
            required
            name={field.name}
            onChange={(e) => handleAgentChange(e, config.namePath)}
            type={field.inputType || 'text'}
            value={value}
            multiline={field.multiline}
            minRows={field.rows}
            style={{ width: '100%', paddingRight: '30px' }}
            variant="outlined"
          />
        }
        {
          type === 'select' &&
          <FormControl
            variant="outlined"
            style={{ width: '100%', paddingRight: '30px' }}>
            <Select
              name={field.name}
              value={value}
              onChange={(e) => handleAgentChange(e, config.namePath)}
              style={{ backgroundColor: '#fff' }}
            >
              <MenuItem value="" style={{ color: '#bdbdbd' }}>
                <em>
                  {t('agent.page.form.select.input.nome')}
                </em>
              </MenuItem>
              {field.values.map((value, index) => (
                <MenuItem key={`select-${index}`} value={value} style={{ textTransform: 'uppercase' }}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      </Grid>
    </>
  )
}