import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';

const CognitiveStep = ({ handleAgentChange, agent, t }) => {
  const cognitiveConfig = [
    {
      title: t('agent.page.form.step.cognitive.enable.title'),
      namePath: 'vectorStoreConfig',
      fields: [
        {
          label: t('agent.page.form.step.cognitive.enable.api.key'),
          name: 'apiKey',
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
          label: t('agent.page.form.step.cognitive.enable.type'),
          name: 'type',
        },
        {
          label: t('agent.page.form.step.cognitive.enable.model'),
          name: 'model',
        }
      ]
    }
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
                  {
                    field.label &&
                    <Grid item xs={4}>
                      <Typography variant='body2'>{field.label}{field.required ? '*' : ''}</Typography>
                    </Grid>
                  }

                  <Grid item xs={8}>
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

export default withTranslation()(CognitiveStep);