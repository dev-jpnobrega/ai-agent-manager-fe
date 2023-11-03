import React from 'react';

import PageBase from './PageBase';
import ListAgentsContainer from '../containers/Agent/ListAgents';

import MainContainer from '../containers/Main';

function ListAgentsPage() {

  return (    
    <MainContainer>
      <PageBase title={"Agents"}>
        <ListAgentsContainer />
      </PageBase>     
    </MainContainer>
  )
}

export default ListAgentsPage;