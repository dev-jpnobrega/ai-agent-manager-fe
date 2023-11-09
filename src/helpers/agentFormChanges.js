import { omitBy, isUndefined, cloneDeep, isEmpty, pickBy } from "lodash";

export const agentFormChanges = (agent, event, path = '') => {
  const { name, value, checked } = event.target;
  const validateValue = /^\s/.test(value) ? '' : value;

  if (name === 'debug') return ({ ...agent, [name]: checked });
  if (name === 'synchronize') return ({ ...agent, [path]: { ...agent[path], [name]: checked } });
  if (['includesTables', 'indexes'].includes(name)) {
    return ({ ...agent, [path]: { ...agent[path], [name]: validateValue ? [validateValue] : [] } });
  }
  if (path) return ({ ...agent, [path]: { ...agent[path], [name]: validateValue ? validateValue : undefined } });

  return ({ ...agent, [name]: validateValue ? validateValue : undefined });
}

export const agentRequestFeedback = (type, feedback, t) => {
  const feedbacks = {
    saved: {
      success: { title: t('agent.page.form.snackbar.saved.success'), severity: 'success' },
      error: { title: t('agent.page.form.snackbar.saved.error'), severity: 'error' }
    },
    deleted: {
      success: { title: t('agent.page.form.snackbar.deleted.success'), severity: 'success' },
      error: { title: t('agent.page.form.snackbar.error.success'), severity: 'error' }
    }
  }

  return feedbacks[type][feedback ? 'success' : 'error']
}

export const removeUndefinedAgentItems = (agent) => {
  const formattedAgent = {
    ...removeUndefinedItems(agent),
    llmConfig: removeUndefinedItems(agent.llmConfig),
    chatConfig: removeUndefinedItems(agent.chatConfig),
    vectorStoreConfig: removeUndefinedItems(agent.vectorStoreConfig),
    dbHistoryConfig: removeUndefinedItems(agent.dbHistoryConfig),
    dataSourceConfig: removeUndefinedItems(agent.dataSourceConfig)
  }

  if (formattedAgent.dataSourceConfig && !formattedAgent.dataSourceConfig.name && typeof formattedAgent.dataSourceConfig.synchronize === 'boolean') delete formattedAgent.dataSourceConfig

  return pickBy(formattedAgent, value => !isEmpty(value));
}

const removeUndefinedItems = (object) => omitBy(object, isUndefined)

const checkObjectIsCompletedOrEmpty = (object, objectCompletedSize) => {
  const objectSize = Object.keys(removeUndefinedItems(object)).length

  return objectSize === objectCompletedSize || objectSize === 0
}

const checkStepParameterComplete = ({ llmConfig = {} }) => {
  return checkObjectIsCompletedOrEmpty(llmConfig, 5)
}

const checkStepHistoryComplete = ({ dbHistoryConfig = {} }) => {
  return checkObjectIsCompletedOrEmpty(dbHistoryConfig, 5)
}

const checkStepCognitiveComplete = ({ documentIntellegenciConfig = {}, vectorStoreConfig = {} }) => {
  const vectorStoreConfigClone = cloneDeep(vectorStoreConfig)

  // delete optional fields
  delete vectorStoreConfigClone.customFilter

  return checkObjectIsCompletedOrEmpty(vectorStoreConfigClone, 8) &&
    checkObjectIsCompletedOrEmpty(documentIntellegenciConfig, 3)
}

const checkStepDatabaseComplete = ({ dataSourceConfig = {} }) => {
  const dataSourceConfigClone = cloneDeep(dataSourceConfig)

  // delete boolean type fields
  delete dataSourceConfigClone.synchronize

  // delete optional fields
  delete dataSourceConfigClone.schema

  return checkObjectIsCompletedOrEmpty(dataSourceConfigClone, 9)
}

const checkStepsComplete = ({ name = '', dataSourceConfig = {}, documentIntellegenciConfig = {}, llmConfig = {}, vectorStoreConfig = {}, dbHistoryConfig = {} }) => {
  return name && (dataSourceConfig.type ||
    vectorStoreConfig.apiKey ||
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
    default:
      return false
  }
}