import React from "react";
import { Typography } from '@material-ui/core'

import moment from "moment";

import GetAppIcon from '@material-ui/icons/GetApp';

import { useStyles } from './styles';

export const ChatMessage = ({ chat, index }) => {
  const classes = useStyles();

  return (
    <div className={classes[`dialog${chat.role}`]} key={`chat-message-agent${index}`}>
      <div className={classes[`chatBalloon${chat.role}`]}>
        <div className={classes[`chatBalloonText${chat.role}`]}>
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
          {moment(chat.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </div>
    </div>
  )
}