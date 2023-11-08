import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { ChatContainer } from '../containers/Chat';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Context } from '../context/AppContext';

function Chat() {
  const { agentUid, chatUid } = useParams();
  const [_, i18n] = useTranslation('translation')

  const [state] = useContext(Context)

  useEffect(() => {
    if (state.user && state.user.language) {
      i18n.changeLanguage(state.user.language)
    }
  }, [state.user])
  

  return (
    <ChatContainer chatAgent={{ agent: agentUid, chatUid }} />
  )
}

export default Chat; 