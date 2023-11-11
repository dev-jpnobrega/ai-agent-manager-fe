import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';
import { AgentTextField } from '../../../../../components/AgentTextField';

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
          label: t('agent.page.form.step.database.enable.schema'),
          name: 'schema',
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
          inputType: 'password',
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
          label: t('agent.page.form.step.database.enable.synchronize'),
          name: 'synchronize',
          type: 'switch',
        },
        {
          label: t('agent.page.form.step.database.enable.ssl'),
          name: 'ssl',
          type: 'switch',
        }
      ]
    },
    {
      title: t('agent.page.form.step.database.enable.custom.message'),
      namePath: 'dataSourceConfig',
      fields: [
        {
          name: 'customizeSystemMessage',
          multiline: true,
          rows: 4,
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
              <Grid item xs={12} sm={!field.label || field.type === 'switch' ? 12 : 6} key={`parameters-config-${field.namePath}${index}`}>
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                    <AgentTextField
                      xsGrid={field.label ? 8 : 12}
                      config={config}
                      agent={agent}
                      field={field}
                      handleAgentChange={handleAgentChange}
                      value={get(agent, `${config.namePath ? config.namePath + '.' : ''}${field.name}`, '')}
                    />
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