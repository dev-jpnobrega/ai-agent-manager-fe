import React from 'react';
import { Grid, TextField, FormControlLabel, Switch, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';

const DatabaseStep = ({ handleAgentChange, agent, t }) => {
  const databaseConfig = [
    {
      title: t('agent.page.form.step.database.enable.title'),
      namePath: 'dataSourceConfig',
      fields: [
        {
          label: t('agent.page.form.step.database.enable.type'),
          name: 'type',
        },
        {
          label: t('agent.page.form.step.database.enable.database'),
          name: 'database',
        },
        {
          label: t('agent.page.form.step.database.enable.host'),
          name: 'host',
        },
        {
          label: t('agent.page.form.step.database.enable.name'),
          name: 'name',
        },
        {
          label: t('agent.page.form.step.database.enable.username'),
          name: 'username',
        },
        {
          label: t('agent.page.form.step.database.enable.password'),
          name: 'password',
        },
        {
          label: t('agent.page.form.step.database.enable.port'),
          name: 'port',
        },
        {
          label: t('agent.page.form.step.database.enable.includes.tables'),
          name: 'includesTables',
        },
        {
          label: t('agent.page.form.step.database.enable.datasource'),
          name: 'dataSource',
        },
        {
          label: t('agent.page.form.step.database.enable.synchronize'),
          name: 'synchronize',
        },
        {
          label: t('agent.page.form.step.database.enable.custom.message'),
          name: 'customizeSystemMessage',
        }
      ]
    }
  ]

  return (
    <>
      {databaseConfig.map((config, index) => (
        <Grid item xs={12} style={{ marginTop: '12px' }} key={`parameters-config${index}`}>
          <Grid container>
            <Grid item xs={12} >
              <Typography variant='subtitle2' color='textSecondary'>{config.title}</Typography>
            </Grid>
            {config.fields.map((field, index) => (
              <Grid item xs={12} sm={6} key={`parameters-config-${field.namePath}${index}`}>
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  {
                    field.label &&
                    <Grid item xs={4}>
                      <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
                    </Grid>
                  }

                  <Grid item xs={8}>
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
                        value={get(agent, (`${config.namePath ? config.namePath + '.' : ''}${field.name}`), '')}
                        style={{ width: '100%', maxWidth: field.label ? '250px' : '' }}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default withTranslation()(DatabaseStep);