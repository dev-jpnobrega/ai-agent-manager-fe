import React from 'react';
import { useParams } from "react-router-dom";

import { ChatContainer } from '../containers/Chat';

function Chat() {
  const { agentUid, chatUid } = useParams();

  return (
    <ChatContainer chatAgent={{ agent: agentUid, chatUid }} />
  )
}

export default Chat; 