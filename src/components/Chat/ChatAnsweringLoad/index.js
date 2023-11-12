import React from "react";
import { last, isEmpty } from "lodash";

import './styles.css'

export const ChatAnsweringLoad = ({ chatMessages }) => {
  const isLastItemUserMessage = isEmpty(chatMessages) || (last(chatMessages).role === 'User' || last(chatMessages).type === 'audio')

  return (
    <>
      {isLastItemUserMessage && <div className="chat-answering-load">
        <span className="chat-answering-load__dots">
          <span className="chat-answering-load__dots__1"></span>
          <span className="chat-answering-load__dots__2"></span>
          <span className="chat-answering-load__dots__3"></span>
        </span>
      </div>}
    </>
  )
}