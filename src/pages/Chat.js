import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { ChatContainer } from '../containers/Chat';
import { getAgent } from '../service/agent-service';
import { useTranslation } from 'react-i18next';

function Chat() {
  const [_, i18n] = useTranslation('translation')
  
  const { agentUid, chatUid, lang } = useParams();
  const [agent, setAgent] = useState({})

  useEffect(async () => {
    if (agentUid) {
      const chatAgent = await getAgent(agentUid)
      setAgent(chatAgent)
    }
    
    lang && i18n.changeLanguage(lang);
  }, [])

  return (
    <ChatContainer chatAgent={{ agent, agentUid, chatUid }} />
  )
}

export default Chat; 