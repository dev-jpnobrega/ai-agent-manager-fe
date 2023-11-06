import React from 'react';

import PageBase from './PageBase';
import ListAgentsContainer from '../containers/Agent/ListAgents';

import MainContainer from '../containers/Main';
import { useTranslation } from 'react-i18next';

function ListAgentsPage() {
  const [t] = useTranslation('translation')

  return (    
    <MainContainer>
      <PageBase title={t('agent.page.title')}>
        <ListAgentsContainer />
      </PageBase>     
    </MainContainer>
  )
}

export default ListAgentsPage;