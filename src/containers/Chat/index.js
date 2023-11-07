import React from "react";

import { Chat } from "../../components/Chat";
import { saveChatLocally, sendMessage, uploadFiles } from "../../service/chat-service";

export const ChatContainer = ({ chatAgent }) => {

  return (
    <Chat
      chatAgent={chatAgent}
      saveChatLocally={saveChatLocally}
      sendMessage={sendMessage}
      uploadFiles={uploadFiles}
    />
  )
}