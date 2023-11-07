import { omitBy, isNil, cloneDeep } from "lodash";

export const agentFormChanges = (agent, event, path = '') => {
  const { name, value, checked } = event.target;

  if (name === 'debug') return ({ ...agent, [name]: checked });
  if (name === 'synchronize') return ({ ...agent, [path]: { ...agent[path], [name]: checked } });
  if (['includesTables', 'indexes'].includes(name)) {
    return ({ ...agent, [path]: { ...agent[path], [name]: value ? [value] : [] } });
  }
  if (path) return ({ ...agent, [path]: { ...agent[path], [name]: value ? value : undefined } });

  return ({ ...agent, [name]: value ? value : undefined  });
}

export const agentRequestFeedback = (type, feedback, t) => {
  const feedbacks = {
    saved: {
      success: { title: t('agent.page.form.snackbar.saved.success'), severity: 'success' },
      error: { title: t( 'agent.page.form.snackbar.saved.error'), severity: 'error' }
    },
    deleted: {
      success: { title: t( 'agent.page.form.snackbar.deleted.success'), severity: 'success' },
      error: { title: t( 'agent.page.form.snackbar.error.success'), severity: 'error' }
    }
  }

  return feedbacks[type][feedback ? 'success' : 'error']
}

const checkObjectIsCompletedOrEmpty = (object, objectCompletedSize) => {
  const objectSize =  Object.keys(omitBy(object, isNil)).length

  return objectSize === objectCompletedSize || objectSize === 0
}

const checkStepParameterComplete = ({ chatConfig = {}, llmConfig = {} }) => {
  return checkObjectIsCompletedOrEmpty(chatConfig, 5) && checkObjectIsCompletedOrEmpty(llmConfig, 5)
}

const checkStepHistoryComplete = ({ dbHistoryConfig = {} }) => {
  return checkObjectIsCompletedOrEmpty(dbHistoryConfig, 5)
}

const checkStepCognitiveComplete = ({ vectorStoreConfig = {} }) => {
  return checkObjectIsCompletedOrEmpty(vectorStoreConfig, 7)
}

const checkStepDatabaseComplete = ({ dataSourceConfig = {} }) => {
  const dataSourceConfigClone = cloneDeep(dataSourceConfig)
  delete dataSourceConfigClone.synchronize
  return checkObjectIsCompletedOrEmpty(dataSourceConfigClone, 11)
}

const checkStepsComplete = ({ name = '', dataSourceConfig = {}, chatConfig = {}, llmConfig = {}, vectorStoreConfig = {}, dbHistoryConfig = {} }) => {
  return name && (dataSourceConfig.type ||
    vectorStoreConfig.apiKey ||
    chatConfig.temperature ||
    llmConfig.type ||
    dbHistoryConfig.type)
}

export const handleFormValidation = (activeStep, agent) => {
  switch (activeStep) {
    case 0:
      return checkStepParameterComplete(agent)
    case 1:
      return checkStepHistoryComplete(agent)
    case 2:
      return checkStepCognitiveComplete(agent)
    case 3:
      return checkStepDatabaseComplete(agent) && checkStepsComplete(agent)
  }
}