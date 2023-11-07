import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Avatar } from '@material-ui/core'

import { Alert } from '@material-ui/lab';

import AdbIcon from '@material-ui/icons/Adb';
import SaveIcon from '@material-ui/icons/Save';

import FileUploader from '../../containers/FIleUploader';
import { useStyles } from './styles';
import { ChatMessage } from './ChatMessage';
import { ChatAnsweringLoad } from './ChatAnsweringLoad';
import { useTranslation } from 'react-i18next';

export const Chat = ({ chatAgent, saveChatLocally, sendMessage, uploadFiles }) => {
  const [t] = useTranslation('translation')

  const chatInputRef = useRef()

  const isAgentDefault = chatAgent.agent === 'default'

  const classes = useStyles()

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [chatMessages, setChatMessages] = useState([])

  const saveChatMessages = (currentChatMessages, files = uploadedFiles) => {
    const { agent, chatUid } = chatAgent

    saveChatLocally(agent, chatUid, currentChatMessages, files.map(file => file.name))
    setChatMessages(currentChatMessages)
  }

  const handleUploadFiles = (files) => {
    if (files.length) {
      const { agent, chatUid } = chatAgent

      uploadFiles(files, chatUid, agent)
      setUploadedFiles(files);
      saveChatMessages(chatMessages, files)
    }
  }

  const handleMessagePushed = () => {
    const element = document.getElementById('chat');
    if (element) {
      element.scrollIntoView();
    }
  }

  const sendCurrentMessage = (message) => new Promise(async (resolve, reject) => {
    const { agent, chatUid } = chatAgent

    const agentAnswer = await sendMessage(message, chatUid, agent)

    if (agentAnswer) return resolve(saveChatMessages([...chatMessages, message, {
      content: agentAnswer.error ? agentAnswer.error : agentAnswer,
      role: 'Agent',
      type: 'message',
      createdAt: new Date(),
    }]))
  });

  const pushChatMessage = (newMessage) => {
    const message = {
      id: chatAgent.chatUid,
      content: newMessage,
      role: 'User',
      type: 'message',
      createdAt: new Date(),
      name: 'Username'
    }

    chatInputRef.current.value = ''

    saveChatMessages([...chatMessages, message])
    setTimeout(() => handleMessagePushed(), 200)

    sendCurrentMessage(message)
      .then(() => handleMessagePushed())
  }

  const handleInputKeyDown = (event) => {
    const { target, key } = event

    if (key === 'Enter' && target.value !== '') pushChatMessage(target.value)
  }

  const handleSendButton = () => {
    const { value } = chatInputRef.current

    if (value !== '') pushChatMessage(value)
  }

  return (
    <Dialog
      open={true}
      maxWidth="sm"
      scroll='paper'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      fullScreen={true}
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        <Grid container alignItems='center'>
          <Grid item xs={9} className={classes.chatAgentInfo} style={{ paddingLeft: '8px' }}>
            <div>
              <Avatar>
                <AdbIcon />
              </Avatar>
            </div>
            <div>
              <Typography variant='subtitle1' className={classes.dialogTexts}>{chatAgent.agent}</Typography>
              <Typography variant='body2' className={classes.dialogTextsSub}>
                {isAgentDefault ? t('agent.custom') : t('agent.specialized')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} justifyContent='flex-end' className={classes.dialogTitleMenuButtons}>
            <SaveIcon color="action" fontSize="small" />
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={handleUploadFiles} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          uploadedFiles.length > 0 &&
          <div className={classes.uploadedFiles}>
            <span style={{ color: 'black', fontWeight: '700' }}> Uploaded files:<br /></span>
            {uploadedFiles.map((file, index) => (<span key={`updated-item${index}`}>{file.name}<br /></span>))}
          </div>
        }

        {
          uploadedFiles.length === 0 && isAgentDefault &&
          <Alert severity="warning">
            {t('chat.agent.custom.info')}
          </Alert>
        }

        {chatMessages.map((chat, index) => <ChatMessage key={`chat-message-agent${index}`} classes={classes} chat={chat} index={index} />)}
        <div id="chat" />
        <ChatAnsweringLoad chatMessages={chatMessages} />
      </DialogContent>
      <DialogActions>
        <div className={classes.dialogActions}>
          <input
            ref={chatInputRef}
            className={classes.inputChat}
            placeholder='Type your message here...'
            onKeyDown={handleInputKeyDown}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.sendButton}
            onClick={handleSendButton}>
            {t('agent.page.chat.send')}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
};
