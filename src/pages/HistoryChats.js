import React from 'react';

import PageBase from './PageBase';
import MainContainer from '../containers/Main';
import { HistoryChatsContainer } from '../containers/HistoryChats';

function HistoryChats() {
  return (
    <MainContainer>
      <PageBase title={'History Chats'}>
        <HistoryChatsContainer/>
      </PageBase>
    </MainContainer>
  )
}

export default HistoryChats; 