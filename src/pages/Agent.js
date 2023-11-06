import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import PageBase from './PageBase';
import AgentContainer from '../containers/Agent/Agent';
import MainContainer from '../containers/Main';
import { SnackbarContext } from '../context/SnackbarContext';
import { getAgent } from '../service/agent-service';
import { useTranslation } from 'react-i18next';

function AgentPage({ history }) {
  const [t] = useTranslation('translation')
  const [currentAgent, setCurrentAgent] = useState({})

  const { setSnackbar } = useContext(SnackbarContext)

  useEffect(async () => {
    const { state } = history.location
    if (state && state.agent) {

      const agent = await getAgent(state.agent)

      if (agent && agent.name) return setCurrentAgent({ ...agent, key: state.agent })

      setSnackbar({ title: 'Ocorreu um erro ao recuperar o agente.', severity: 'error' })
    }

    setCurrentAgent({})
  }, [])

  return (
    <MainContainer>
      <PageBase title={t(currentAgent.name ? "agent.edit.page.title" : "agent.create.page.title")}>
        <AgentContainer history={history} currentAgent={currentAgent} />
      </PageBase>
    </MainContainer>
  )
}

export default withRouter(AgentPage);
// export default withAuthenticator(AgentPage);