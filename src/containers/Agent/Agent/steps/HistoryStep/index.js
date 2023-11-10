import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';
import { AgentTextField } from '../../../../../components/AgentTextField';

const HistoryStep = ({ handleAgentChange, agent, t }) => {
  const historyConfig = [
    {
      title: t('agent.page.form.step.history.enable.title'),
      namePath: 'dbHistoryConfig',
      fields: [
        
        {
          label: t('agent.page.form.step.history.enable.host'),
          name: 'host',
        },
        {
          label: t('agent.page.form.step.history.enable.port'),
          name: 'port',
        },
        {
          label: t('agent.page.form.step.history.enable.password'),
          name: 'password',
          inputType: 'password',
        },
        {
          label: t('agent.page.form.step.history.enable.session.ttl'),
          name: 'sessionTTL',
        },
        {
          label: t('agent.page.form.step.history.enable.type'),
          name: 'type',
          type: 'select',
          values: ['redis', 'cosmos']
        },
        {
          label: t('agent.page.form.step.history.enable.ssl'),
          name: 'ssl',
          type: 'switch',
        },
      ]
    },
  ]

  return (
    <>
      {historyConfig.map((config, index) => (
        <Grid item xs={12} style={{ marginTop: '12px' }} key={`parameters-config${index}`}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='subtitle2' color='textSecondary'>{config.title}</Typography>
            </Grid>
            {config.fields.map((field, index) => (
              <Grid item xs={12} sm={6} key={`parameters-config-${field.namePath}${index}`}>
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  <AgentTextField
                    xsGrid={8}
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

export default withTranslation()(HistoryStep);