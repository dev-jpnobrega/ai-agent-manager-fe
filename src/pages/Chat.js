import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { ChatContainer } from '../containers/Chat';
import { getAgent } from '../service/agent-service';

function Chat() {
  const { agentUid, chatUid } = useParams();
  const [agent, setAgent] = useState({})

  useEffect(async () => {
    if (agentUid) {
      const chatAgent = await getAgent(agentUid)
      setAgent(chatAgent)
    }
  }, [agentUid])

  return (
    <ChatContainer chatAgent={{ agent, agentUid, chatUid }} />
  )
}

export default Chat; 