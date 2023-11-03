
export const agentFormChanges = (agent, event, path = '') => {
  const { name, value, checked } = event.target;

  if (name === 'debug') return ({ ...agent, [name]: checked });
  if (name === 'synchronize') return ({ ...agent, [path]: { ...agent[path], [name]: checked } });
  if (['includesTables', 'indexes'].includes(name)) return ({ ...agent, [path]: { ...agent[path], [name]: [value] } });
  if (path) return ({ ...agent, [path]: { ...agent[path], [name]: value } });

  return ({ ...agent, [name]: value });
}

export const agentRequestFeedback = (type, feedback) => {
  const feedbacks = {
    saved: {
      success: { title: 'Agente salvo com sucesso.', severity: 'success' },
      error: { title: 'Houve um erro ao salvar o agente.', severity: 'error' }
    },
    deleted: {
      success: { title: 'Agente excluído com sucesso.', severity: 'success' },
      error: { title: 'Houve um erro ao salvar o agente.', severity: 'error' }
    }
  }

  return feedbacks[type][feedback ? 'success' : 'error']
}