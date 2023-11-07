import { isEmpty } from "lodash";

export const agentFormChanges = (agent, event, path = '') => {
  const { name, value, checked } = event.target;

  if (name === 'debug') return ({ ...agent, [name]: checked });
  if (name === 'synchronize') return ({ ...agent, [path]: { ...agent[path], [name]: checked } });
  if (['includesTables', 'indexes'].includes(name)) {
    return ({ ...agent, [path]: { ...agent[path], [name]: value ? [value] : [] } });
  }
  if (path) return ({ ...agent, [path]: { ...agent[path], [name]: value } });

  return ({ ...agent, [name]: value });
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

const checkStepParameterComplete = ({ chatConfig = {}, llmConfig = {} }) => {
  console.log('chatConfig', chatConfig)
  console.log('llmConfig', llmConfig)

  const {
    temperature = null,
    topP = null,
    frequencyPenalty = null,
    presencePenalty = null,
    maxTokens = null
  } = chatConfig

  const {
    type = null,
    model = null,
    instance = null,
    apiKey = null,
    apiVersion = null,
  } = llmConfig

  return (isEmpty(chatConfig) && isEmpty(llmConfig)) ||
    ((temperature && topP && frequencyPenalty && presencePenalty && maxTokens) &&
      (type && model && instance && apiKey && apiVersion)) ||
    ((!temperature && !topP && !frequencyPenalty && !presencePenalty && !maxTokens) &&
      (!type && !model && !instance && !apiKey && !apiVersion)) ||
    ((temperature && topP && frequencyPenalty && presencePenalty && maxTokens) &&
      (!type && !model && !instance && !apiKey && !apiVersion)) ||
    ((!temperature && !topP && !frequencyPenalty && !presencePenalty && !maxTokens) &&
      (type && model && instance && apiKey && apiVersion))
}

const checkStepHistoryComplete = ({ dbHistoryConfig = {} }) => {
  console.log('dbHistoryConfig', dbHistoryConfig)
  const {
    type = null,
    host = null,
    port = null,
    password = null,
    sessionTTL = null,
  } = dbHistoryConfig

  return (isEmpty(dbHistoryConfig)) ||
    (type && host && port && password && sessionTTL) ||
    (!type && !host && !port && !password && !sessionTTL)
}

const checkStepCognitiveComplete = ({ vectorStoreConfig = {} }) => {
  console.log('vectorStoreConfig', vectorStoreConfig)
  const {
    apiKey = null,
    apiVersion = null,
    name = null,
    type = null,
    vectorFieldName = null,
    indexes = [],
    model = null,
  } = vectorStoreConfig

  return (isEmpty(vectorStoreConfig)) ||
    (apiKey && apiVersion && name && type && vectorFieldName && indexes.length > 0 && model) ||
    (!apiKey && !apiVersion && !name && !type && !vectorFieldName && indexes.length === 0 && !model)
}

const checkStepDatabaseComplete = ({ dataSourceConfig = {} }) => {
  console.log('dataSourceConfig', dataSourceConfig)
  const {
    type = null,
    schema = null,
    database = null,
    host = null,
    name = null,
    username = null,
    password = null,
    port = null,
    includesTables = [],
    customizeSystemMessage = null,
    dataSource = null,
  } = dataSourceConfig

  return (isEmpty(dataSourceConfig)) ||
    (type && schema && database && host && name && username && password && port && includesTables.length > 0 && customizeSystemMessage && dataSource) ||
    (!type && !schema && !database && !host && !name && !username && !password && !port && includesTables.length === 0 && !customizeSystemMessage && !dataSource)
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