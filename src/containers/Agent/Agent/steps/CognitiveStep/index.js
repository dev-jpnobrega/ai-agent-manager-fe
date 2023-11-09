import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';
import { AgentTextField } from '../../../../../components/AgentTextField';

const CognitiveStep = ({ handleAgentChange, agent, t }) => {
  const cognitiveConfig = [
    {
      title: t('agent.page.form.step.cognitive.enable.title'),
      namePath: 'vectorStoreConfig',
      fields: [
        {
          label: t('agent.page.form.step.cognitive.enable.api.key'),
          name: 'apiKey',
          inputType: 'password',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.name'),
          name: 'name',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.index'),
          name: 'indexes',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.version'),
          name: 'apiVersion',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.vector.name'),
          name: 'vectorFieldName',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.custom.filter'),
          name: 'customFilter',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.type'),
          name: 'type',
          type: 'select',
          values: ['azure', 'redis', 'cosmos']
        },
        {
          label: t('agent.page.form.step.cognitive.enable.model'),
          name: 'model',
        },
      ]
    },
    {
      title: t('agent.page.form.step.parameter.intellegence.config'),
      namePath: 'documentIntellegenciConfig',
      fields: [
        {
          label: t('agent.page.form.step.parameter.intellegence.config.api.key'),
          name: 'apiKey',
          inputType: 'password',
        },
        {
          label: t('agent.page.form.step.parameter.intellegence.config.endpoint'),
          name: 'endpoint',
        },
        {
          label: t('agent.page.form.step.parameter.intellegence.config.type'),
          name: 'type',
          type: 'select',
          values: ['azure', 'aws', 'gcp']
        },
      ]
    },
  ]

  return (
    <>
      {cognitiveConfig.map((config, index) => (
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

export default withTranslation()(CognitiveStep);