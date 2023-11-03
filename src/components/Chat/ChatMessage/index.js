import React from "react";
import { Typography } from '@material-ui/core'

import GetAppIcon from '@material-ui/icons/GetApp';

export const ChatMessage = ({ classes, chat, index }) => {
  const hour = new Date(chat.createdAt).getHours()
  const minutes = new Date(chat.createdAt).getMinutes()

  return (
    <div className={classes[`dialog${chat.author}`]} key={`chat-message-agent${index}`}>
      <div className={classes[`chatBalloon${chat.author}`]}>
        <div className={classes[`chatBalloonText${chat.author}`]}>
          {chat.type === 'message' && chat.content}
          {chat.type === 'picture' && <img src={chat.content} alt="Send By Agent" className={classes.chatImage} />}
          {chat.type === 'file' &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GetAppIcon fontSize="large" />
              <a href="../../assets/images/peru.png" download>
                {chat.content}
              </a>
            </div>
          }
        </div>
        <Typography variant='body2' className={classes.chatBalloonTime}>
          {hour}:{minutes}
        </Typography>
      </div>
    </div>
  )
}