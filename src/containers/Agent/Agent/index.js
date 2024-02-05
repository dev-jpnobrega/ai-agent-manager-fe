import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { v4 as uuidv4 } from 'uuid';

import { Grid, Paper, TextField, Stepper, Step, StepLabel, Box, Switch, FormControlLabel, Button, useMediaQuery, Typography, Divider } from '@material-ui/core';

import { ParameterStep, CognitiveStep, DatabaseStep, HistoryStep, SwaggerStep } from './steps';
import { useStyles } from './styles'
import { updateAgent, saveAgent, deleteAgent } from '../../../service/agent-service';
import { agentSupportSettings } from '../../../helpers/agentSupportSettings';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { SnackbarContext } from '../../../context/SnackbarContext';
import { agentFormChanges, agentRequestFeedback, handleFormValidation, checkStepsComplete } from '../../../helpers/agentFormChanges';
import { ResponsiveButton } from '../../../components/ResponsiveButton';

const getStepContent = (stepIndex, agent, handleAgentChange) => {
  switch (stepIndex) {
    case 0:
      return <ParameterStep agent={agent} handleAgentChange={handleAgentChange} />
    // case 1:
    //   return <ServicesStep agent={agent} handleAgentChange={handleAgentChange} />
    case 1:
      return <HistoryStep agent={agent} handleAgentChange={handleAgentChange} />
    case 2:
      return <CognitiveStep agent={agent} handleAgentChange={handleAgentChange} />
    case 3:
      return <DatabaseStep agent={agent} handleAgentChange={handleAgentChange} />
    case 4:
      return <SwaggerStep agent={agent} handleAgentChange={handleAgentChange} />
    default:
      return <></>;
  }
}

const AgentContainer = ({ history, currentAgent }) => {
  const [t] = useTranslation('translation');
  const classes = useStyles();
  const mobile = useMediaQuery('(max-width:450px)');

  const { setSnackbar } = useContext(SnackbarContext)

  const [activeStep, setActiveStep] = useState(0);
  const [agent, setAgent] = useState(agentSupportSettings);

  const steps = [
    t('agent.page.form.step.parameter'),
    t('agent.page.form.step.history.enable'),
    t('agent.page.form.step.cognitive.enable'),
    t('agent.page.form.step.database.enable'),
    t('agent.page.form.step.swagger.enable'),
  ]

  useEffect(() => { currentAgent && setAgent(currentAgent) }, [currentAgent])

  const handleAgentChange = (event, path = '') => {
    const updatedAgent = agentFormChanges(agent, event, path)
    setAgent(updatedAgent)
  }

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleRequestFeedback = (type, feedback) => {
    const snackBarProps = agentRequestFeedback(type, feedback, t)
    setSnackbar(snackBarProps)
    feedback && history.push('/agents')
  }

  const handleSaveAgent = async () => {
    const requestProps = {
      func: currentAgent.key ? updateAgent : saveAgent,
      agent: { key: currentAgent.key || uuidv4(), value: agent }
    }

    const saved = await requestProps.func(requestProps.agent)

    handleRequestFeedback('saved', saved)
  }

  const handleDeleteAgent = async () => {
    const deleted = await deleteAgent(currentAgent.key)

    handleRequestFeedback('deleted', deleted)
  }

  return (
    <section>
      <Box my={2}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {currentAgent.key &&
              <>
                <ResponsiveButton
                  mobile={mobile}
                  color="secondary"
                  size="small"
                  variant="contained"
                  alt="Save"
                  Icon={DeleteIcon}
                  style={{ textTransform: 'uppercase' }}
                  description={t('agent.page.form.delete')}
                  onClick={handleDeleteAgent}
                />

                <ResponsiveButton
                  mobile={mobile}
                  disabled={!checkStepsComplete(agent)}
                  color="primary"
                  size="small"
                  variant="contained"
                  alt="Save"
                  Icon={SaveIcon}
                  style={{ textTransform: 'uppercase' }}
                  description={t('agent.page.form.save')}
                  onClick={handleSaveAgent}
                />
              </>
            }
            <Button variant="contained" color="primary" onClick={() => { history.push('/agents') }}>
              {t('agent.page.form.back')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={1}>
        <Grid container spacing={2}
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: '100%' }}>
              <form noValidate autoComplete="off">
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={3} sm={1}>
                    <Typography variant='body2'>{t('agent.page.form.name')}*</Typography>
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    <TextField
                      required
                      name="name"
                      variant="outlined"
                      onChange={(e) => handleAgentChange(e)}
                      value={agent.name}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container spacing={2} justifyContent="center" alignItems='center'>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              name="debug"
                              checked={agent.debug}
                              onChange={handleAgentChange}
                              color='primary'
                            />
                          }
                          label={t('agent.page.form.debug')}
                          value={agent.debug}
                          labelPlacement="start"
                          style={{ color: 'black', marginTop: '10px' }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={12} >
                    <Box mt={3}>
                      <Divider />
                      <Box mt={3} style={{ backgroundColor: '#f6f6f6', borderRadius: '4px 4px 0 0', padding: '4px 24px 15px 24px' }}>
                        {
                          <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: '#f6f6f6' }}>
                            {steps.map((label, index) => (
                              <Step key={index}>
                                <StepLabel>{mobile ? '' : label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        }

                        <Grid container>
                          {getStepContent(activeStep, agent, handleAgentChange)}
                          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', paddingTop: '20px' }}>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              {t('agent.page.form.previous')}
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={!handleFormValidation(activeStep, agent)}
                              onClick={() => {
                                if (activeStep === steps.length - 1) return handleSaveAgent(agent)
                                handleNext()
                              }}>
                              {activeStep === steps.length - 1 ? t('agent.page.form.save') : t('agent.page.form.next')}
                            </Button>
                          </Grid>
                        </Grid>

                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </section>
  )
}


export default AgentContainer;