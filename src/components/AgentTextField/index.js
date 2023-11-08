import React from "react"
import { get } from 'lodash'
import { useMediaQuery, Select, MenuItem, FormControl, Grid, TextField, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import { useStyles } from './styles'

export const AgentTextField = ({ config, agent, field, handleAgentChange, xsGrid = 8, value }) => {
  const [t] = useTranslation('translation')
  const mobile = useMediaQuery('(max-width:599px)');
  const classes = useStyles({ mobile })
  const { type = 'input' } = field

  return (
    <>
      {
        !mobile && field.label &&
        <Grid item xs={12} md={4}>
          <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
        </Grid>
      }

      <Grid item xs={12} md={xsGrid} style={{ paddingTop: '12px' }}>
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
            className={classes.switchForm}
            label={mobile ? field.label : ''}
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
            variant="outlined"
            label={mobile ? field.label : ''}
          />
        }
        {
          type === 'select' &&
          <FormControl
            variant="outlined"
            className={classes.selectForm}
            >
            <Select
              name={field.name}
              value={value}
              label={mobile ? 'Type' : ''}
              onChange={(e) => handleAgentChange(e, config.namePath)}
              className={classes.select}
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