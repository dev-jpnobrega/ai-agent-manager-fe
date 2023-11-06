import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';

const ParameterStep = ({ handleAgentChange, agent, t }) => {
  const parametersConfig = [
    {
      title: t('agent.page.form.step.parameter.chat.config'),
      namePath: 'chatConfig',
      fields: [
        {
          label: t('agent.page.form.step.parameter.chat.config.temperature'),
          name: 'temperature',
        },
        {
          label: t('agent.page.form.step.parameter.chat.config.topP'),
          name: 'topP',
        },
        {
          label: t('agent.page.form.step.parameter.chat.config.penalty.frequency'),
          name: 'frequencyPenalty',
        },
        {
          label: t('agent.page.form.step.parameter.chat.config.penalty.presence'),
          name: 'presencePenalty',
        },
        {
          label: t('agent.page.form.step.parameter.chat.config.max.tokens'),
          name: 'maxTokens',
        }
      ]
    },
    {
      title: t('agent.page.form.step.parameter.llm.config'),
      namePath: 'llmConfig',
      fields: [
        {
          label: t('agent.page.form.step.parameter.llm.config.type'),
          name: 'type',
        },
        {
          label: t('agent.page.form.step.parameter.llm.config.model'),
          name: 'model',
        },
        {
          label: t('agent.page.form.step.parameter.llm.config.instance'),
          name: 'instance',
        },
        {
          label: t('agent.page.form.step.parameter.llm.config.api.key'),
          name: 'apiKey',
        },
        {
          label: t('agent.page.form.step.parameter.llm.config.api.version'),
          name: 'apiVersion',
        }
      ]
    },
    {
      title: t('agent.page.form.step.parameter.system.message'),
      namePath: '',
      fields: [
        {
          name: 'systemMesssage',
        }
      ]
    }
  ]

  return (
    <>
      {parametersConfig.map((config, index) => (
        <Grid item xs={12} sm={index === 2 ? '' : 6} style={{ marginTop: '12px' }} key={`parameters-config${index}`}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='subtitle2' color='textSecondary'>{config.title}</Typography>
            </Grid>
            {config.fields.map((field, index) => (
              <Grid item xs={12} key={`parameters-config-${field.namePath}${index}`}>
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  {
                    field.label &&
                    <Grid item xs={4}>
                      <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
                    </Grid>
                  }

                  <Grid item xs={field.label ? 8 : 12}>
                    <TextField
                      required
                      name={field.name}
                      onChange={(e) => handleAgentChange(e, config.namePath)}
                      size="small"
                      value={get(agent, `${config.namePath ? config.namePath + '.' : ''}${field.name}`, '')}
                      style={{ width: '100%', maxWidth: field.label ? '250px' : '' }}
                    />
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

export default withTranslation()(ParameterStep);