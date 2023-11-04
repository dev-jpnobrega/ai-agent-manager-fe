import React from "react";
import { Chat } from "../../components/Chat";
import { saveChatLocally, sendMessage, uploadFiles } from "../../service/chat-service";

export const ChatContainer = ({ chatProps, setChatProps }) => {

  return (
    <Chat
      chatProps={chatProps}
      setChatProps={setChatProps}
      saveChatLocally={saveChatLocally}
      sendMessage={sendMessage}
      uploadFiles={uploadFiles}
    />
  )
}