import { omitBy, isUndefined, cloneDeep, isEmpty, pickBy, toNumber } from "lodash";

export const agentFormChanges = (agent, event, path = '') => {
  const { name, value, checked, type } = event.target;

  if (name === 'debug') return ({ ...agent, [name]: checked });
  if (['synchronize', 'ssl'].includes(name)) return ({ ...agent, [path]: { ...agent[path], [name]: checked } });
  if (['includesTables', 'indexes'].includes(name)) {
    return ({ ...agent, [path]: { ...agent[path], [name]: generateValue(value, type, []) } });
  }
  if (path) return ({ ...agent, [path]: { ...agent[path], [name]: generateValue(value, type, undefined) } });

  return ({ ...agent, [name]: generateValue(value, type, undefined) });
}

const generateValue = (value, type, defaultValue) => {
  const validateValue = /^\s/.test(value) ? '' : value;
  
  if (type === 'number') return value ? toNumber(validateValue) : undefined
  if (validateValue) return validateValue

  return defaultValue
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
  const dbHistoryConfigClone = cloneDeep(dbHistoryConfig)

  // delete boolean type fields
  delete dbHistoryConfigClone.ssl

  return checkObjectIsCompletedOrEmpty(dbHistoryConfigClone, 5)
}

const checkStepCognitiveComplete = ({ documentIntellegenciConfig = {}, vectorStoreConfig = {} }) => {
  const vectorStoreConfigClone = cloneDeep(vectorStoreConfig)

  // delete optional fields
  delete vectorStoreConfigClone.customFilters

  return checkObjectIsCompletedOrEmpty(vectorStoreConfigClone, 7) &&
    checkObjectIsCompletedOrEmpty(documentIntellegenciConfig, 3)
}

const checkStepDatabaseComplete = ({ dataSourceConfig = {} }) => {
  const dataSourceConfigClone = cloneDeep(dataSourceConfig)

  // delete boolean type fields
  delete dataSourceConfigClone.synchronize
  delete dataSourceConfigClone.ssl

  // delete optional fields
  delete dataSourceConfigClone.schema
  delete dataSourceConfigClone.customizeSystemMessage

  return checkObjectIsCompletedOrEmpty(dataSourceConfigClone, 8)
}

export const checkStepsComplete = ({ name = '', dataSourceConfig = {}, documentIntellegenciConfig = {}, llmConfig = {}, vectorStoreConfig = {}, dbHistoryConfig = {} }) => {
  return name &&
    checkStepParameterComplete({ llmConfig }) &&
    checkStepHistoryComplete({ dbHistoryConfig }) &&
    checkStepCognitiveComplete({ documentIntellegenciConfig, vectorStoreConfig }) &&
    checkStepDatabaseComplete({ dataSourceConfig }) &&
    (
      dataSourceConfig.type ||
      documentIntellegenciConfig.apiKey ||
      vectorStoreConfig.apiKey ||
      llmConfig.type ||
      dbHistoryConfig.type
    )
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