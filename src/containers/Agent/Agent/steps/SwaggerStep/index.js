import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { get } from 'lodash';
import { withTranslation } from 'react-i18next';
import { AgentTextField } from '../../../../../components/AgentTextField';

const SwaggerStep = ({ handleAgentChange, agent, t }) => {
  const databaseConfig = [
    {
      title: t('agent.page.form.step.swagger.enable.custom.message'),
      namePath: 'SwaggerConfig',
      fields: [
        {
          name: 'swagger',
          multiline: true,
          rows: 14,
        }
      ]
    }
  ]

  return (
    <>
      {databaseConfig.map((config, index) => (
          <Grid item xs={12} style={{ marginTop: '12px' }} key={`swagger-config-${index}`}>
            <Grid container>
              <Grid item xs={12} >
                <Typography variant='subtitle2' color='textSecondary'>{config.title}</Typography>
              </Grid>
              {config.fields.map((field, index) => (
                <Grid item xs={12} sm={!field.label || field.type === 'switch' ? 12 : 6} key={`swagger-config-${field.namePath}${index}`}>
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

export default withTranslation()(SwaggerStep);